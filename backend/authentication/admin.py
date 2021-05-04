from django.contrib import admin
from .models import CustomUser, FriendShip


class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser


class FriendShipAdmin(admin.ModelAdmin):
    model = FriendShip
    list_display = ['sender', 'dester', 'status', 'date_of_send', 'date_of_dest']


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(FriendShip, FriendShipAdmin)
