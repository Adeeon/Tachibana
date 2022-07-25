from rest_framework import permissions
from users.models import CustomUser

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

class isSuper(permissions.IsAdminUser):
    def has_permission(self, request, view):
        return request.user.username == 'cgt10'

class isRegisteredOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated