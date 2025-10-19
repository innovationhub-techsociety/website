from .models import Competition, Submission, TimelineEvent, ResearchOpportunity, SessionRecording, User
from django.contrib.auth import get_user_model
from rest_framework import serializers

# Get the custom User model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "email", "linkedin_profile"]
        extra_kwargs = {"password": {"write_only": True}}

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
            return Submission.objects.filter(competition=obj, user=user).exists()
        return False

# 4. Serializer to CREATE a submission
class SubmissionCreateSerializer(serializers.ModelSerializer):
    # Make 'user' a read-only field; it will be set automatically from the request context in the view.
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Submission
        fields = ['id', 'user', 'competition', 'submission_file', 'submission_text', 'submitted_at']
        read_only_fields = ['submitted_at']


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