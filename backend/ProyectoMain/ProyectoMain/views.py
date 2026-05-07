
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import TestSerializer 

class TestView(APIView):
    def get(self, request):
        data = {
            "status": "ok",
            "message": "¡El backend está funcionando correctamente!",
            "version": "1.0.0"
        }
        
        serializer = TestSerializer(data)
        
        return Response(serializer.data, status=status.HTTP_200_OK)