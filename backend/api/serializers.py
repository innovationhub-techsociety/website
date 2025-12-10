from .models import *
from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.utils import timezone

# Get the custom User model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "email", "linkedin_profile"]
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# 3. Serializer to READ competition data
class CompetitionSerializer(serializers.ModelSerializer):
    # This magic field will tell the frontend if the logged-in user has already submitted
    has_submitted = serializers.SerializerMethodField()

    class Meta:
        model = Competition
        # Serialize all fields from the Competition model
        fields = '__all__'

    def get_has_submitted(self, obj):
        """
        Check if the user in the current request context has a submission for this competition.
        """
        user = self.context['request'].user
        if user.is_authenticated:
            # Check the lightweight submission record which indicates a user submitted
            return Submission.objects.filter(competition=obj, user=user).exists()
        return False

# 4. Serializer to CREATE a submission
class SubmissionCreateSerializer(serializers.Serializer):
    competition = serializers.PrimaryKeyRelatedField(queryset=Competition.objects.all())
    submission_file = serializers.FileField()
    submission_text = serializers.CharField(required=False, allow_blank=True)
    user = serializers.ReadOnlyField(source='user.username')
    submitted_at = serializers.DateTimeField(read_only=True)

    def validate(self, data):
        """
        Check that the competition is still open (deadline has not passed).
        """
        competition = data.get('competition')
        if competition:
            if timezone.now() > competition.deadline:
                raise serializers.ValidationError({"competition": "The deadline for this competition has passed."})
        return data

    def validate_submission_file(self, value):
        """Validate that the file size does not exceed 5MB."""
        if value:
            file_size = value.size
            limit = 5 * 1024 * 1024  # 5MB in bytes
            if file_size > limit:
                raise serializers.ValidationError(
                    f"File size exceeds 5MB limit. Current size: {file_size / (1024 * 1024):.2f}MB"
                )
        return value

# 5. Serializers for other models (these are straightforward)
class TimelineEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimelineEvent
        fields = '__all__'

class ResearchOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchOpportunity
        fields = '__all__'

class SessionRecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionRecording
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    user_linkedin = serializers.ReadOnlyField(source='user.linkedin_profile')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'user_linkedin', 'post', 'content', 'created_at']
        read_only_fields = ['created_at']

    def get_user(self, obj):
        full_name = obj.user.get_full_name()
        return full_name if full_name else obj.user.username

class PostSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    user_linkedin = serializers.ReadOnlyField(source='user.linkedin_profile')
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_linkedin', 'content', 'file', 'likes_count', 'is_liked', 'created_at', 'comments']
        read_only_fields = ['created_at']

    def get_user(self, obj):
        full_name = obj.user.get_full_name()
        return full_name if full_name else obj.user.username

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False