from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        if CustomUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Пользователь с таким адресом существует'})
        if 0 < len(attrs['password']) < 8:
            raise serializers.ValidationError({'password': 'Слишком короткий пароль'})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password': 'Пароли не совпадают'})
        return attrs

    username = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    password2 = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'password2', 'first_name', 'photo')
        extra_kwargs = {'password': {'write_only': True}, 'password2': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        validated_data.pop('password2', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class CustomUserFullSerializer(serializers.ModelSerializer):
    def validate(self, attrs):
        print(attrs)
        if 'password' in attrs:
            if 0 < len(attrs['password']) < 8:
                raise serializers.ValidationError({'password': 'Слишком короткий пароль'})
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({'password': 'Пароли не совпадают'})
        return attrs

    username = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True, required=False)
    password2 = serializers.CharField(min_length=8, write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'password', 'password2', 'first_name', 'last_name', 'photo')
        extra_kwargs = {'password': {'write_only': True}, 'password2': {'write_only': True}}

    def update(self, instance, validated_data):
        print(validated_data['first_name'])
        print(validated_data['last_name'])
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        if 'photo' in validated_data:
            instance.photo = validated_data['photo']
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        return instance


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        return token
