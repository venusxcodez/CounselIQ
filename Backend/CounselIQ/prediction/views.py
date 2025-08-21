from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .utils import get_prediction

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_admission(request):
    user = request.user

    college_name = request.data.get('college_name')
    user_marks = request.data.get('user_marks')

    if not college_name:
        return Response({"detail": "college_name is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    if user_marks is None:
        return Response({"detail": "user_marks is required."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_marks = int(user_marks)
    except (TypeError, ValueError):
        return Response({"detail": "user_marks must be a number."}, status=status.HTTP_400_BAD_REQUEST)
    
    preferred_streams = getattr(user, 'preferred_streams', None)
    exam_type = getattr(user, 'exam_type', None)
    category = getattr(user, 'category', None)

    if preferred_streams is None:
        return Response({"detail": "User has no preferred_streams set. Please update your profile."},status=status.HTTP_400_BAD_REQUEST)

    if isinstance(preferred_streams, str):
        try:
            import json
            parsed = json.loads(preferred_streams)
            if isinstance(parsed, list):
                preferred_streams = parsed
            else:
                preferred_streams = [preferred_streams]
        except Exception:
            preferred_streams = [preferred_streams]

    if not isinstance(preferred_streams, list):
        preferred_streams = list(preferred_streams)

    if not exam_type or not category:
        return Response({"detail": "User profile missing exam_type or category."}, status=status.HTTP_400_BAD_REQUEST)
    

    EXAM_MAX_MARKS = {
        "JEE" : 360,
        "NEET" : 720,
        "CUET" : 300,
    }

    exam_key = str(exam_type).strip().upper() if exam_type is not None else ""
    matched_key = None
    for k in EXAM_MAX_MARKS.keys():
        if k == exam_key:
            matched_key = k
            break

    if matched_key:
        max_marks = EXAM_MAX_MARKS[matched_key]
        if not (0<=user_marks<=max_marks):
            return Response({
                "detail": f"Please enter valid marks for {exam_type}"},
                status=status.HTTP_400_BAD_REQUEST
                )

    # print("College Name:",college_name)
    # print("User Marks:", user_marks)
    # print("Preferred Streams:", preferred_streams)
    # print("Exam Type:", exam_type)
    # print("Category:", category)

    try:
        results = get_prediction(
            college_name=college_name,
            streams=preferred_streams,
            exam_type=exam_type,
            category=category,
            user_marks=user_marks
        )
        print(results)
    except Exception as e:
        return Response({"detail": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"results": results}, status=status.HTTP_200_OK)