from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('TachiHome', views.HomeViewSet, basename='Tachibana')
router.register('users', views.UserViewSet, basename='users')
router.register('pages', views.PageViewSet, basename='page')
router.register('posts', views.PostViewSet, basename='posts')
router.register('comments', views.CommentViewSet, basename='comments')

urlpatterns = router.urls + [
    path('currentuser/', views.CurrentUserView.as_view()),
]