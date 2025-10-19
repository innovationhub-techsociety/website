from django.shortcuts import render
from .models import User
from rest_framework import generics
from .serializers import (
    UserSerializer, CompetitionSerializer, SubmissionCreateSerializer,
    TimelineEventSerializer, ResearchOpportunitySerializer, SessionRecordingSerializer
)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Competition, Submission, TimelineEvent, ResearchOpportunity, SessionRecording

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

# A view to handle creating a new submission
class SubmissionCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SubmissionCreateSerializer
    # For handling file uploads
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Automatically associate the submission with the logged-in user
        serializer.save(user=self.request.user)

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
