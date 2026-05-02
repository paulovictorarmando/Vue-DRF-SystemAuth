from django.shortcuts import render
from rest_framework import ModelViewSet, status
from rest_framework.response import Response
from rest_framework.decorators import action
from auth.models import Usuario
from .serializer import UsuarioSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

class UsuarioViewSet(ModelViewSet):

    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        if not request.user.is_Staff:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return super().list(request)
    def create(self, request):
        if not request.user.is_Staff:
            return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
        return super().create(request)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
