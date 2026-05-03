from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class Usuario(AbstractUser):
    username = models.CharField(blank=False, null=False, unique=True)
    email = models.EmailField(blank=False, null=False, unique=True)

    class Meta:
        ordering = ['-id']