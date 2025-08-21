from rest_framework import serializers
from .models import College, SavedCollege

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = [
            "id",
            "name",
            "rating",
            "fees",      
            "location",
            "website",
            "stream",
            "exam",
            "image",
        ]


class SavedCollegeSerializer(serializers.ModelSerializer):
    college = CollegeSerializer(read_only=True)
    class Meta:
        model = SavedCollege
        fields = ['id','user','college','saved_at']
        read_only_fields = ['saved_at','user']

class SavedCollegeCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCollege
        fields = ['id', 'college']  