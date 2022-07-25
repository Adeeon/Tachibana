from rest_framework import serializers
from django.contrib.auth import get_user_model
from posts.models import Post, Comment
from page.models import Page
from users.models import CustomUser

class NestedPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('name')

class NestedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('title')

class NestedCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')

class PageSerializer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, read_only=True, source='posts')
    class Meta:
        model = Page
        fields = ('name', 'purpose', 'top_image', 'post_detail')

class PostSerializer(serializers.ModelSerializer):
    com_detail = NestedCommentSerializer(many=True, read_only=True, source='comments')
    class Meta:
        model = Post
        fields = ('title', 'author', 'body', 'rate', 'created', 'image_head', 'com_detail')

class CommentSerializer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, source='posts', read_only=True)
    class Meta:
        model = Comment
        fields = ('body', 'post_detail')

class UserSerailizer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, source='title', read_only=True)
    class Meta:
        model = get_user_model()
        fields = ('username', 'post_detail')
