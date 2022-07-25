from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Ppic(models.Model):
    related = models.ForeignKey(get_user_model(), related_name='userpic', on_delete=models.CASCADE )