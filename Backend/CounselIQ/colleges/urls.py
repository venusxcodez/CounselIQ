from django.urls import path
from .views import CollegeListAPIView, SavedCollegeCreateView, SavedCollegeListView, SavedCollegeDeleteView

urlpatterns = [
    path("", CollegeListAPIView.as_view(), name="college-list"),
    path('saved/',SavedCollegeListView.as_view(), name="saved-college-list"),
    path('saved/add/',SavedCollegeCreateView.as_view(), name="saved-college-add"),
    path('saved/<int:pk>/delete/', SavedCollegeDeleteView.as_view(),name="saved-college-delete")
]