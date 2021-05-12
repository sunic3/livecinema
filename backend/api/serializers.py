from rest_framework import serializers

from authentication.models import FriendShip
from authentication.serializers import CustomUserSerializer
from movie.models import Movie, Genre, Director, Actor, UseService, Service, Review, Mark, Quote, Watcher

from functools import reduce


class GenreSerialize(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'


class ActorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class MovieListSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(slug_field='name', read_only=True, many=True)
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'slug', 'posterUrl', 'genres', 'year', 'rating', 'country']

    def get_rating(self, instance):
        marks = Mark.objects.filter(movie=instance)
        return f'{reduce(lambda pm, m: pm + m.value, marks, 0) / len(marks):.1f}' if len(marks) > 0 else '0.0'


class MovieSerializer(serializers.ModelSerializer):
    director = DirectorSerializer(read_only=True)
    company = serializers.SlugRelatedField(slug_field='name', read_only=True)
    genres = GenreSerialize(read_only=True, many=True)
    actors = ActorSerializers(read_only=True, many=True)

    rating = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'director', 'company', 'genres', 'actors', 'title', 'slug',
                  'description', 'short_description', 'posterUrl', 'year', 'country', 'trailer', 'age', 'rating']

    def get_rating(self, instance):
        marks = Mark.objects.filter(movie=instance)
        return f'{reduce(lambda pm, m: pm + m.value, marks, 0) / len(marks):.1f}' if len(marks) > 0 else '0.0'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['name', 'logo']


class ServicesSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)

    class Meta:
        model = UseService
        fields = ['id', 'service', 'type', 'link', 'money']


class CreateQuoteListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    type = serializers.SerializerMethodField()

    class Meta:
        model = Quote
        fields = ['id', 'hero', 'author', 'content', 'type']

    def get_type(self, instance):
        return 'self'


class ReviewListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    date = serializers.DateField(format="%d.%m.%Y")
    rating = serializers.SerializerMethodField()
    type = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'title', 'author', 'date', 'content', 'rating', 'type', 'permissions']

    def get_rating(self, instance):
        try:
            return Mark.objects.get(movie=instance.movie, user=instance.author).value
        except:
            return None

    def get_type(self, instance):
        if not self.context['request'].user.is_authenticated:
            return 'default'

        if self.context['request'].user == instance.author:
            return 'self'

        if FriendShip.objects.filter(sender=self.context['request'].user,
                                     dester=instance.author,
                                     status=1).first() or \
                FriendShip.objects.filter(
                    sender=instance.author,
                    dester=self.context['request'].user,
                    status=1).first():
            return 'friend'
        return 'default'


class QuoteListSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)
    date = serializers.DateField(format="%d.%m.%Y")
    type = serializers.SerializerMethodField()

    class Meta:
        model = Quote
        fields = ['id', 'author', 'hero', 'date', 'content', 'type', 'permissions']

    def get_type(self, instance):
        if not self.context['request'].user.is_authenticated:
            return 'default'

        if self.context['request'].user == instance.author:
            return 'self'

        if FriendShip.objects.filter(sender=self.context['request'].user,
                                     dester=instance.author,
                                     status=1).first() or \
                FriendShip.objects.filter(
                    sender=instance.author,
                    dester=self.context['request'].user,
                    status=1).first():
            return 'friend'
        return 'default'


class WatcherListSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    status = serializers.SerializerMethodField()
    movies = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Watcher
        fields = ['id', 'user', 'status', 'movies', 'rating']

    def get_status(self, instance):
        if not self.context['request'].user.is_authenticated:
            return 0

        if instance.user == self.context['request'].user:
            return -1

        if FriendShip.objects.filter(sender=self.context['request'].user,
                                     dester=instance.user).exists() or \
                FriendShip.objects.filter(
                    sender=instance.user,
                    dester=self.context['request'].user).exists():
            return 1
        return 0

    def get_movies(self, instance):
        user_watchs = Watcher.objects.filter(user=instance.user)
        match = 0

        if self.context['request'].user.is_authenticated:
            for movie in user_watchs:
                if Watcher.objects.filter(movie=movie.movie, user=self.context['request'].user).exists():
                    match += 1

        return {
            'all': user_watchs.count(),
            'match': match
        }

    def get_rating(self, instance):
        try:
            return Mark.objects.get(user=instance.user, movie=instance.movie).value
        except:
            return 0


class MovieCommonSerializer(serializers.Serializer):
    info = MovieSerializer(read_only=True)
    services = ServicesSerializer(read_only=True, many=True)
    rating = serializers.IntegerField()
    review = serializers.BooleanField()
    watched = serializers.BooleanField()
