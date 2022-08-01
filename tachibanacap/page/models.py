from django.db import models
from users.models import CustomUser

# Create your models here.

class TachiHome(models.Model):
    name = models.TextField(max_length=20)

    def __str__(self):
        return self.name

class Page(models.Model):
    name = models.TextField(max_length=20, unique=True)
    home = models.ForeignKey(TachiHome, related_name='pages', on_delete=models.CASCADE)
    top_image = models.ImageField(upload_to='pageimg/', height_field=None, width_field=None, max_length=None, null=True)
    purpose = models.TextField(max_length=100)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


