from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UsuarioViewSet
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register('auth/users', UsuarioViewSet, basename='users')

urlpatterns = [
    path('auth/login/', TokenObtainPairView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    *routers.urls,
]