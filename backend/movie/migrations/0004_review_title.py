# Generated by Django 3.2 on 2021-04-26 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0003_alter_review_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='title',
            field=models.CharField(default='', max_length=255),
        ),
    ]
