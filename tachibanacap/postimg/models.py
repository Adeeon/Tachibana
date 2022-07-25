from django.db import models

# Create your models here.

class PostImg(models.Model):
    image = models.ImageField(upload_to='postimg/media')