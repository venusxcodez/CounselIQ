from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics, permissions,status
from rest_framework.response import Response
from .models import College, SavedCollege
from .serializers import CollegeSerializer, SavedCollegeSerializer, SavedCollegeCreateSerializer

# Create your views here.
class CollegeListAPIView(generics.ListAPIView):
    serializer_class = CollegeSerializer
    queryset = College.objects.all()

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params

        stream = params.get("stream")
        exam = params.get("exam")
        rating_gte = params.get("rating_gte")
        sort_by = params.get("sort_by")

        q = Q()
        if stream:
            q &= Q(stream__iexact=stream)
        if exam:
            q &= Q(exam__iexact=exam)
        if rating_gte:
            try:
                q &= Q(rating__gte=float(rating_gte))
            except ValueError:
                pass
         
        qs = qs.filter(q)

        if sort_by == "rating":
            qs = qs.order_by("-rating")
        elif sort_by == "fees":
            qs = qs.order_by("fees")
        else:
            qs = qs.order_by("-rating","name")

        return qs
    

class SavedCollegeListView(generics.ListAPIView):
    serializer_class = SavedCollegeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedCollege.objects.filter(user=self.request.user)
    
class SavedCollegeCreateView(generics.CreateAPIView):
    serializer_class = SavedCollegeCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class SavedCollegeDeleteView(generics.DestroyAPIView):
    permission_classees = [permissions.IsAuthenticated]

    def delete(self,request,pk):
        try:
            saved_college = SavedCollege.objects.get(pk=pk,user=request.user)
            saved_college.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except SavedCollege.DoesNotExist:
            return Response({"detail": "Not found"},status=status.HTTP_404_NOT_FOUND)