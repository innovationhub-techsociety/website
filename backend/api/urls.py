from django.urls import path
from .views import *

urlpatterns = [
    path('user/', GetCurrentUserView.as_view(), name='get-current-user'),
]
