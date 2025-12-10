from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    linkedin_profile = models.URLField(blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='api_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='api_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

class Competition(models.Model):
    class CompetitionType(models.TextChoices):
        ESSAY = 'ESSAY', 'Essay Prompt'
        PITCH = 'PITCH', 'Pitch Competition'

    class CompetitionStatus(models.TextChoices):
        UPCOMING = 'UPCOMING', 'Upcoming'
        OPEN = 'OPEN', 'Open'
        CLOSED = 'CLOSED', 'Closed'

    title = models.CharField(max_length=255)
    type = models.CharField(max_length=10, choices=CompetitionType.choices)
    category = models.CharField(max_length=100, help_text="e.g., Artificial Intelligence, BioTech")
    description = models.TextField(blank=True, help_text="Optional: Provide a brief description or prompt details.")
    deadline = models.DateTimeField()
    status = models.CharField(max_length=10, choices=CompetitionStatus.choices, default=CompetitionStatus.UPCOMING)
    is_active = models.BooleanField(default=True, help_text="Uncheck to hide from the frontend without deleting.")

    class Meta:
        ordering = ['deadline']

    def __str__(self):
        return f"[{self.get_type_display()}] {self.title}"

class Submission(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name='submissions')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    submission_text = models.TextField(blank=True, help_text="Optional text the user provided at submission time.")
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']
        unique_together = ('competition', 'user')

    def __str__(self):
        return f"Submission: {self.user.username} -> {self.competition.title} @ {self.submitted_at.isoformat()}"

class TimelineEvent(models.Model):
    class EventType(models.TextChoices):
        VIRTUAL = 'VIRTUAL', 'Virtual'
        IN_PERSON = 'IN_PERSON', 'In-Person'

    title = models.CharField(max_length=255)
    description = models.TextField()
    event_date = models.DateTimeField()
    type = models.CharField(max_length=10, choices=EventType.choices)

    class Meta:
        ordering = ['event_date']

    def __str__(self):
        return self.title

class ResearchOpportunity(models.Model):
    title = models.CharField(max_length=255)
    field = models.CharField(max_length=100, help_text="e.g., CleanTech, AI")
    professor = models.CharField(max_length=100)
    spots_available = models.PositiveIntegerField(default=1)
    description = models.TextField()

    class Meta:
        verbose_name_plural = "Research Opportunities"
        ordering = ['field', 'title']

    def __str__(self):
        return self.title

class SessionRecording(models.Model):
    title = models.CharField(max_length=255)
    speaker = models.CharField(max_length=100)
    recording_date = models.DateField()
    duration_minutes = models.IntegerField(help_text="Duration in whole minutes.")
    video_url = models.URLField(help_text="Link to the video (e.g., YouTube, Vimeo).")

    class Meta:
        ordering = ['-recording_date']

    def __str__(self):
        return self.title

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    file = models.FileField(upload_to='posts/', blank=True, null=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Post by {self.user.username} at {self.created_at}"

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Comment by {self.user.username} on Post {self.post.id}"