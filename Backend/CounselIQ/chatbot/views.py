from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
import google.generativeai as genai
from colleges.models import College
from accounts.models import User

# Create your views here.
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@csrf_exempt
def chatbot_response(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        colleges = College.objects.all().values('name', 'location', 'fees', 'rating')
        colleges_data = list(colleges)

        context = f"""
        You are CounselIQ, a career counselling assistant.
        You ONLY answer questions about the following colleges: {colleges_data}.
        If asked anything else, politely say you can only answer college-related queries.
        """

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"{context}\nUser: {user_message}")

        return JsonResponse({"response": response.text.strip()})
    return JsonResponse({"error": "Invalid request method"}, status=405)