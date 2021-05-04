from django.contrib import admin

from .models import Genre, Actor, Director, Movie, Service, UseService, Review, Mark, Quote, Watcher


admin.site.register(Genre)
admin.site.register(Actor)
admin.site.register(Director)
admin.site.register(Movie)
admin.site.register(Service)
admin.site.register(UseService)
admin.site.register(Review)
admin.site.register(Quote)
admin.site.register(Mark)
admin.site.register(Watcher)
