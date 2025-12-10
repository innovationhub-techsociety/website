from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('user/', GetCurrentUserView.as_view(), name='get-current-user'),
    path('competitions/', CompetitionListView.as_view(), name='competition-list'),
    path('submissions/', SubmissionCreateView.as_view(), name='submission-create'),
    path('events/', TimelineEventListView.as_view(), name='event-list'),
    path('research/', ResearchOpportunityListView.as_view(), name='research-list'),
    path('recordings/', SessionRecordingListView.as_view(), name='recording-list'),
    path('', include(router.urls)),
]