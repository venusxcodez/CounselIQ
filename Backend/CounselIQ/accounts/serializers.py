from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'exam_type', 'category', 'state', 'preferred_streams']

    def create(self,validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email'],
        )
        user.set_password(validated_data['password']) #hashes the password
        user.save()
        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name',
            'exam_type', 'category', 'state', 'preferred_streams'
        ]