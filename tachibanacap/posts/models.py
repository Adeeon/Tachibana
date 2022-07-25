from django.db import models
from page.models import Page

# Create your models here.

class Post(models.Model):
    title = models.TextField(max_length=50)
    body = models.TextField(max_length=2000)
    author = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    image_head = models.URLField(blank=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']

class Comment(models.Model):
    body = models.TextField(max_length=500)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.author

    class Meta:
        ordering = ['rate']
    
    