from django.shortcuts import render
from django.core.mail import send_mail, EmailMessage
from django.conf import settings
from .models import User
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Competition, Submission, TimelineEvent, ResearchOpportunity, SessionRecording

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    permission_classes = [AllowAny]
    authentication_classes = []
    
    @property
    def callback_url(self):
        # Return the callback_url from the request body (e.g. 'postmessage')
        return self.request.data.get('callback_url', 'postmessage')
    
class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:5173/login"
    permission_classes = [AllowAny]
    authentication_classes = []

class MicrosoftLogin(SocialLoginView):
    adapter_class = MicrosoftGraphOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:5173/login"
    permission_classes = [AllowAny]
    authentication_classes = []

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class GetCurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

class CompetitionListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CompetitionSerializer
    # Only show competitions marked as active
    queryset = Competition.objects.filter(is_active=True)

from . import services

# A view to handle creating a new submission
class SubmissionCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubmissionCreateSerializer
    # For handling file uploads
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        """Validate incoming submission data but do NOT save it to the database.
        Instead, send submission details (and the uploaded file if present) via email
        to the configured notification addresses.
        """
    def create(self, request, *args, **kwargs):
        """Validate incoming submission data but do NOT save it to the database.
        Instead, send submission details (and the uploaded file if present) via email
        to the configured notification addresses.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = request.user
        validated = serializer.validated_data
        competition = validated.get('competition')
        submission_text = validated.get('submission_text', '')
        submission_file = validated.get('submission_file', None)

        # Send notification email (do not persist anything to DB)
        try:
            services.send_admin_notification(user, competition, submission_text, submission_file)
        except Exception as e:
            # Log error but return success response (submission itself shouldn't fail if email fails)
            print(f"Error sending submission notification email: {e}")

        # Send confirmation email to user
        try:
            services.send_user_confirmation(user, competition)
        except Exception as e:
            print(f"Error sending user confirmation email: {e}")

        try:
            Submission.objects.get_or_create(
                competition=competition,
                user=user,
                defaults={'submission_text': submission_text or ''}
            )
        except Exception as e:
            # Log but do not fail the response
            print(f"Failed to create submission record: {e}")

        return Response({"detail": "Submission received, emailed, and receipt recorded."}, status=201)

# Generic List Views for other models
class TimelineEventListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TimelineEventSerializer
    queryset = TimelineEvent.objects.all()

class ResearchOpportunityListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ResearchOpportunitySerializer
    queryset = ResearchOpportunity.objects.all()

class SessionRecordingListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SessionRecordingSerializer
    queryset = SessionRecording.objects.all()

from rest_framework import viewsets, status
from rest_framework.decorators import action

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
            return Response({'status': 'unliked'})
        else:
            post.likes.add(user)
            return Response({'status': 'liked'})

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
