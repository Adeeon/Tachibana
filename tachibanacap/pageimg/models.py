from django.db import models

# Create your models here.
class PageImg(models.Model):
    image = models.ImageField(upload_to='pageimg/media')