import datetime
import re
from transliterate import translit

from django.db import models
from django.utils import timezone

from authentication.models import CustomUser


class BaseModel(models.Model):
    objects = models.Manager()

    class Meta:
        abstract = True


class Genre(BaseModel):
    name = models.CharField(max_length=63, verbose_name='название')
    slug = models.CharField(max_length=255, verbose_name='Ссылка', null=True, blank=True)

    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = re.sub(r'[^a-z0-9_]', '', translit(str(self.name), 'ru', reversed=True)
                               .replace(' ', '_').lower()).strip('_')

        super(Genre, self).save(*args, **kwargs)


class Actor(BaseModel):
    name = models.CharField(max_length=255, verbose_name='полное имя')
    photo = models.ImageField(verbose_name='фото', null=True, blank=True)

    class Meta:
        verbose_name = 'Актер'
        verbose_name_plural = 'Актеры'

    def __str__(self):
        return f'{self.pk}: {self.name}'


class Director(BaseModel):
    name = models.CharField(max_length=255, verbose_name='Полное имя')
    slug = models.CharField(max_length=255, verbose_name='Ссылка', null=True, blank=True)
    photo = models.ImageField(verbose_name='фото', null=True, blank=True)

    class Meta:
        verbose_name = 'Режиссер'
        verbose_name_plural = 'Режиссеры'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = re.sub(r'[^a-z0-9_]', '', translit(str(self.name), 'ru', reversed=True)
                               .replace(' ', '_').lower()).strip('_')

        super(Director, self).save(*args, **kwargs)


class Movie(BaseModel):
    title = models.CharField(max_length=255, verbose_name='заголовок')
    slug = models.CharField(max_length=255, verbose_name='Ссылка', null=True, blank=True)
    description = models.TextField(verbose_name='Описание')
    short_description = models.TextField(default='', verbose_name='Краткое описание')
    serial = models.BooleanField(default=False)
    posterUrl = models.URLField(verbose_name='Постер', null=True, blank=True)
    year = models.IntegerField(verbose_name='Год выхода', default=2021)
    country = models.CharField(max_length=63, verbose_name='Страна производства', null=True, blank=True)
    genres = models.ManyToManyField(Genre, verbose_name='Жанры')
    actors = models.ManyToManyField(Actor, verbose_name='Актеры')
    trailer = models.URLField(verbose_name='Ссылка на трейлер', null=True, blank=True)
    age = models.IntegerField(default=0, verbose_name='Возраст')
    director = models.ForeignKey(Director, verbose_name='Режиссер', on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = 'фильм'
        verbose_name_plural = 'фильмы'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = re.sub(r'[^a-z0-9_]', '', translit(str(self.title), 'ru', reversed=True)
                               .replace(' ', '_').lower()).strip('_')

        super(Movie, self).save(*args, **kwargs)


class Service(BaseModel):
    name = models.CharField(max_length=63, verbose_name='Название')
    logo = models.ImageField(verbose_name='Лого', null=True, blank=True)

    class Meta:
        verbose_name = 'Сервис'
        verbose_name_plural = 'Сервисы'
        ordering = ['name']

    def __str__(self):
        return self.name


class UseService(BaseModel):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, verbose_name='Сервис')
    type = models.IntegerField(default=0, null=True, blank=True, verbose_name='Тип')
    money = models.IntegerField(null=True, blank=True, verbose_name='Стоимость')
    link = models.URLField(verbose_name='Ссылка')

    class Meta:
        verbose_name = 'Где посмотреть'
        verbose_name_plural = 'Где посмотреть'

    def __str__(self):
        return f'{self.service} - {self.movie}'


class Review(BaseModel):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Автор рецензии')
    title = models.CharField(max_length=255, verbose_name='Заголовок')
    date = models.DateField(auto_now_add=True, verbose_name='Дата публикации')
    content = models.TextField(blank=False, null=False, verbose_name='Контент')
    permissions = models.IntegerField(default=0, verbose_name='Доступ')

    def __str__(self):
        return f'{self.movie} by {self.author}'

    class Meta:
        verbose_name = 'Рецензия'
        verbose_name_plural = 'Рецензии'


class Quote(BaseModel):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм')
    hero = models.CharField(max_length=255, blank=True, null=True, verbose_name='Кто сказал')
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Автор киноцитаты')
    date = models.DateField(auto_now_add=True, verbose_name='Дата публикации')
    content = models.TextField(blank=False, null=False, verbose_name='Контент')
    permissions = models.IntegerField(default=0, verbose_name='Доступ')

    def __str__(self):
        return f'{self.movie} by {self.author}'

    class Meta:
        verbose_name = 'Киноцитата'
        verbose_name_plural = 'Киноцитаты'
        ordering = ['-id']


class Mark(BaseModel):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Юзер')
    value = models.IntegerField(default=0, verbose_name='Рейтинг')
    date = models.DateField(auto_now_add=True, null=True)

    class Meta:
        verbose_name = 'Оценка'
        verbose_name_plural = 'Рейтинг фильма'

    def __str__(self):
        return f'{self.movie} by {self.user}'

    def save(self, *args, **kwargs):
        if not self.date:
            self.date = timezone.now()

        super(Mark, self).save(*args, **kwargs)



class Watcher(BaseModel):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, verbose_name='Фильм')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Зритель')
    date = models.DateField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        verbose_name = 'Зритель'
        verbose_name_plural = 'Зрители'

    def __str__(self):
        return f'{self.user} watched {self.movie}'
