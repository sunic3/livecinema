from django.urls import include, path
from . import views


urlpatterns = [
    path('movies', views.MovieListView.as_view()),
    path('reviews/<str:movie_slug>', views.ReviewListView.as_view()),
    path('quotes/<str:movie_slug>', views.QuoteListView.as_view()),
    path('watchers/<str:movie_slug>', views.WatcherListView.as_view()),
    path('createreview/', views.CreateReview.as_view()),
    path('createquote/', views.CreateQuote.as_view()),
    path('addmark/', views.AddMarkView.as_view()),
    path('getmark/', views.GetMarkView.as_view()),
    path('addfriend/', views.AddFriendView.as_view()),
    path('genres', views.GenreListView.as_view()),
    path('movie/<str:slug>', views.MovieView.as_view()),
    path('search/<str:query>', views.SearchView.as_view()),
    path('auth/', include('authentication.urls')),
]
