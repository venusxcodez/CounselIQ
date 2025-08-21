from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    EXAM_CHOICES = [
        ('JEE','JEE'),
        ('NEET','NEET'),
        ('CUET','CUET')
    ]

    CATEGORY_CHOICES = [
        ('GEN', 'General'),
        ('OBC', 'OBC'),
        ('SC', 'SC'),
        ('ST', 'ST'),
        ('EWS', 'EWS'),
    ]

    exam_type = models.CharField(max_length=10,choices=EXAM_CHOICES, blank=True,null=True)
    category = models.CharField(max_length=5,choices=CATEGORY_CHOICES,blank=True, null=True)
    state = models.CharField(max_length=50,blank=True, null=True)
    preferred_streams = models.JSONField(blank=True,null=True)