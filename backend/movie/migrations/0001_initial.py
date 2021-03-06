# Generated by Django 3.2 on 2021-04-19 23:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='полное имя')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='', verbose_name='фото')),
            ],
            options={
                'verbose_name': 'Актер',
                'verbose_name_plural': 'Актеры',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='название')),
            ],
            options={
                'verbose_name': 'Кинокомпания',
                'verbose_name_plural': 'Кинокомпании',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Полное имя')),
                ('slug', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ссылка')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='', verbose_name='фото')),
            ],
            options={
                'verbose_name': 'Режиссер',
                'verbose_name_plural': 'Режиссеры',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=63, verbose_name='название')),
                ('slug', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ссылка')),
            ],
            options={
                'verbose_name': 'Жанр',
                'verbose_name_plural': 'Жанры',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='заголовок')),
                ('slug', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ссылка')),
                ('description', models.TextField(verbose_name='Описание')),
                ('serial', models.BooleanField(default=False)),
                ('posterUrl', models.URLField(blank=True, null=True, verbose_name='Постер')),
                ('year', models.IntegerField(default=2021, verbose_name='Год выхода')),
                ('country', models.CharField(blank=True, max_length=63, null=True, verbose_name='Страна производства')),
                ('trailer', models.URLField(blank=True, null=True, verbose_name='Ссылка на трейлер')),
                ('age', models.IntegerField(default=0, verbose_name='Возраст')),
                ('actors', models.ManyToManyField(to='movie.Actor', verbose_name='Актеры')),
                ('company', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='movie.company', verbose_name='Компания')),
                ('director', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='movie.director', verbose_name='Режиссер')),
                ('genres', models.ManyToManyField(to='movie.Genre', verbose_name='Жанры')),
            ],
            options={
                'verbose_name': 'фильм',
                'verbose_name_plural': 'фильмы',
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=63, verbose_name='Название')),
                ('logo', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Лого')),
            ],
            options={
                'verbose_name': 'Сервис',
                'verbose_name_plural': 'Сервисы',
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='UseService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(blank=True, default=0, null=True, verbose_name='Тип')),
                ('money', models.IntegerField(blank=True, null=True, verbose_name='Стоимость')),
                ('link', models.URLField(verbose_name='Ссылка')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.movie', verbose_name='Фильм')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movie.service', verbose_name='Сервис')),
            ],
        ),
    ]
