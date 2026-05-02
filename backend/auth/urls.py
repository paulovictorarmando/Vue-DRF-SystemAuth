from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpaterns = [
    path('auth/login/', TokenObtainPairView.as_view()),

]