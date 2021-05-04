from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CustomUserCreate, Hello

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/hello/', Hello.as_view(), name="hello_user"),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
