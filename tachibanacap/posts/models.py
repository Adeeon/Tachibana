from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.TextField(max_length=50)
    body = models.TextField(max_length=2000)
    author = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']

class Comment(models.Model):
    body = models.TextField(max_length=500)
    author = models.ForeignKey('auth.User', related_name='comments', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.author

    class Meta:
        ordering = ['rate']
    
    