from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image


# Create your models here.

class CustomUser(AbstractUser):
    username = models.TextField(max_length=32, blank=True, null=True, unique=True)
    email = models.EmailField('email address', unique=True)
    fname = models.TextField(max_length=30)
    lname = models.TextField(max_length=30)
    phone = models.CharField(max_lenthg=12)
    ppic = models.ImageField(upload_to='/ppic/media/ppics')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    class Meta:
        ordering = ['username']