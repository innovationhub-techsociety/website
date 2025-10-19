from django.contrib import admin
from .models import Competition, Submission, TimelineEvent, ResearchOpportunity, SessionRecording

# Register your models here.
admin.site.register(Competition)
admin.site.register(Submission)
admin.site.register(TimelineEvent)
admin.site.register(ResearchOpportunity)
admin.site.register(SessionRecording)
