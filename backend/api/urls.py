from django.urls import path
from .views import *

urlpatterns = [
    path('user/', GetCurrentUserView.as_view(), name='get-current-user'),
    path('competitions/', CompetitionListView.as_view(), name='competition-list'),
    path('submissions/', SubmissionCreateView.as_view(), name='submission-create'),
    path('events/', TimelineEventListView.as_view(), name='event-list'),
    path('research/', ResearchOpportunityListView.as_view(), name='research-list'),
    path('recordings/', SessionRecordingListView.as_view(), name='recording-list'),
]