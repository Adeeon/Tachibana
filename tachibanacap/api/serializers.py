from rest_framework import serializers
from django.contrib.auth import get_user_model
from posts.models import Post, Comment
from page.models import Page
from users.models import CustomUser


class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

class NestedCommentSerializer(serializers.ModelSerializer):
    user_detail = NestedUserSerializer(read_only=True, source='author')
    class Meta:
        model = Comment
        fields = ('id', 'body', 'author', 'rate', 'created', 'user_detail')

class NestedPostSerializer(serializers.ModelSerializer):
    com_detail = NestedCommentSerializer(many=True, read_only=True, source='comments')
    user_detail = NestedUserSerializer(read_only=True, source='author')
    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'author', 'user_detail', 'image_head', 'rate', 'created', 'com_detail')

class NestedPageSerializer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(read_only=True, many=True, source='posts')
    class Meta:
        model = Page
        fields = ('id', 'name', 'purpose', 'top_image', 'posts')



class PageSerializer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, read_only=True, source='posts')    
    class Meta:
        model = Page
        fields = ('id', 'name', 'purpose', 'top_image', 'post_detail',)

class PostSerializer(serializers.ModelSerializer):
    com_detail = NestedCommentSerializer(many=True, read_only=True, source='comments')
    user_detail = NestedUserSerializer(read_only=True, source='author')
    post_detail = NestedPostSerializer(many=True, read_only=True, source='posts')
  
    class Meta:
        model = Post
        fields= ('id', 'title', 'author', 'body', 'rate', 'image_head', 'created', 'page', 'user_detail', 'post_detail','com_detail')
        

class CommentSerializer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, source='posts', read_only=True)
    user_detail= NestedUserSerializer(read_only=True, source='author')
    class Meta:
        model = Comment
        fields = ('id', 'body', 'author', 'created', 'rate', 'post_detail', 'user_detail')

class UserSerailizer(serializers.ModelSerializer):
    post_detail = NestedPostSerializer(many=True, source='author', read_only=True)
    class Meta:
        model = CustomUser
        fields = ('username', 'post_detail')
