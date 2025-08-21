from django.urls import path
from .views import predict_admission

urlpatterns = [
    path('',predict_admission, name = 'predict_admission')
]