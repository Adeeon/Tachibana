from django.db import models

# Create your models here.
class Page(models.Model):
    name = models.TextField(max_length=20)
    top_image = models.ImageField(upload_to='/pageimg/media', height_field=None, width_field=None, max_length=None)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
