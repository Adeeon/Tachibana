from django.db import models

# Create your models here.

class Ppic(models.Model):
    related = models.ForeignKey('auth.User', related_name='userpic', on_delete=models.CASCADE )