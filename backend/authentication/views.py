from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

# import jwt
# from rest_framework_jwt.utils import jwt_payload_handler

from backend import settings
from .serializers import CustomUserSerializer


# def create_token(user):
#     payload = jwt_payload_handler(user)
#     token = jwt.encode(payload, settings.SECRET_KEY)
#     return token.decode('unicode_escape')


class CustomUserCreate(APIView):
    def post(self, request, format='json'):
        data = request.data
        serializer = CustomUserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()

            if user:
                refresh = TokenObtainPairSerializer.get_token(user)
                access = refresh.access_token
                return Response({'access': str(access), 'refresh': str(refresh)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Hello(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        return Response(data={'name': request.user.username}, status=status.HTTP_200_OK)
