from django.urls import path
from .views import SignupView, ProfileUpdateView, LoginView, CurrentUserView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('profile/<int:id>/', ProfileUpdateView.as_view(), name='profile-update'),
    path('login/', LoginView.as_view(),name= 'login'),
    path('me/', CurrentUserView.as_view(),name='current_user')
]