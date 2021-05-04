from django.utils import timezone

from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    photo = models.ImageField(null=True, blank=True)


class FriendShip(models.Model):
    sender = models.ForeignKey(CustomUser, related_name='sender', on_delete=models.CASCADE)
    dester = models.ForeignKey(CustomUser, related_name='dester', on_delete=models.CASCADE)
    status = models.IntegerField(default=0)
    date_of_send = models.DateField(auto_now_add=True)
    date_of_dest = models.DateField(auto_now=True)
