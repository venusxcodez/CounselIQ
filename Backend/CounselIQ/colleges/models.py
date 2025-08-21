from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class College(models.Model):
    STREAM_CHOICES = [
        ('Engineering','Engineering'),
        ('Medical','Medical'),
        ('Arts_Commerce','Arts & Commerce'),
    ]

    EXAM_CHOICES = [
        ('JEE','JEE'),
        ('NEET','NEET'),
        ('CUET','CUET'),
    ]

    name = models.CharField(max_length=255)
    rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        help_text="0.0 to 5.0"
    )
    fees = models.FloatField(help_text="Fees in K")
    location = models.CharField(max_length=255)
    website = models.URLField(max_length=500)
    image = models.CharField(max_length=300, blank=True) 
    stream = models.CharField(max_length=20,choices=STREAM_CHOICES)
    exam = models.CharField(max_length=20,choices=EXAM_CHOICES)

    class Meta:
        indexes = [
            models.Index(fields=['stream']),
            models.Index(fields=['exam']),
            models.Index(fields=['-rating']),
        ]
        ordering = ['-rating']

    def __str__(self):
        return self.name
    

class SavedCollege(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE, related_name="saved_colleges")
    college = models.ForeignKey(College,on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'college')

    def __str__(self):
        return f"{self.user.username} saved {self.college.name}"