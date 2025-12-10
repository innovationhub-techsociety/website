from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Competition)
admin.site.register(TimelineEvent)
admin.site.register(ResearchOpportunity)
admin.site.register(SessionRecording)
admin.site.register(Submission)
admin.site.register(Post)
admin.site.register(Comment)