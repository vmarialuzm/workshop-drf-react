from rest_framework import status
#from rest_framework_simplejwt import views as jwt_views
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializers import TaskSerializador

class Tasks(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        snippets = Task.objects.all()
        serializer = TaskSerializador(snippets, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TaskSerializador(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
