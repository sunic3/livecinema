import time
from functools import reduce

from django.db.models import Q

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from authentication.models import FriendShip, CustomUser
from authentication.serializers import CustomUserSerializer, CustomUserFullSerializer
from .serializers import MovieListSerializer, MovieCommonSerializer, ReviewListSerializer, \
	QuoteListSerializer, CreateQuoteListSerializer, WatcherListSerializer, GenreSerialize

from movie.models import Movie, UseService, Review, Mark, Quote, Watcher, Genre


class MovieListView(APIView):
	def get(self, request):
		data = {}
		if 'new' in request.query_params:
			movies = Movie.objects.order_by('-year')
		elif 'genre' in request.query_params:
			genre = Genre.objects.get(slug=request.query_params['genre'])
			movies = genre.movie_set.all().order_by('-year')
			data = GenreSerialize(genre).data
		else:
			movies = Movie.objects.filter(serial=False).order_by('?')
		if 'limit' in request.query_params:
			data = {'more': len(movies) - int(request.query_params['limit'])}
			movies = movies[:int(request.query_params['limit'])]
		serializer = MovieListSerializer(movies, many=True)

		return Response({'data': data, 'movies': serializer.data}, status=status.HTTP_200_OK)


class GenreListView(APIView):
	def get(self, request):
		genres = Genre.objects.all()
		serializer = GenreSerialize(genres, many=True)

		return Response(serializer.data, status=status.HTTP_200_OK)


class MovieView(APIView):
	def get(self, request, slug):
		data = {'info': Movie.objects.get(slug=slug)}
		data['services'] = UseService.objects.filter(movie=data['info'])

		if request.user.is_authenticated:
			data['review'] = Review.objects.filter(movie=data['info'], author=request.user).exists()
			data['watched'] = Watcher.objects.filter(user=request.user, movie=data['info']).exists()

			try:
				mark = Mark.objects.get(user=request.user, movie=data['info'])
				data['rating'] = mark.value
			except:
				data['rating'] = 0
		else:
			data['rating'] = 0
			data['review'] = False
			data['watched'] = False

		serializer = MovieCommonSerializer(data, context={'request': request})
		return Response(serializer.data)


class ReviewListView(APIView):
	def get(self, request, movie_slug):
		movie = Movie.objects.get(slug=movie_slug)

		if request.user.is_authenticated:
			friends = list(map(lambda f: f.dester, FriendShip.objects.filter(sender=request.user, status=1))) + list(
				map(lambda f: f.sender, FriendShip.objects.filter(dester=request.user, status=1)))
			reviews = Review.objects.filter(author=request.user, movie=movie) | Review.objects.filter(
				Q(Q(permissions=0) | Q(permissions=1), author__in=friends) | Q(permissions=0), movie=movie)
		else:
			reviews = Review.objects.filter(movie=movie, permissions=0)

		serializer = ReviewListSerializer(reviews, many=True, context={'request': request})

		return Response(serializer.data)


class QuoteListView(APIView):
	def get(self, request, movie_slug):
		movie = Movie.objects.get(slug=movie_slug)

		if request.user.is_authenticated:
			friends = list(map(lambda f: f.dester, FriendShip.objects.filter(sender=request.user, status=1))) + list(
				map(lambda f: f.sender, FriendShip.objects.filter(dester=request.user, status=1)))
			quotes = Quote.objects.filter(author=request.user, movie=movie) | Quote.objects.filter(
				Q(Q(permissions=0) | Q(permissions=1), author__in=friends) | Q(permissions=0), movie=movie)
		else:
			quotes = Quote.objects.filter(movie=movie, permissions=0)
		serializer = QuoteListSerializer(quotes, many=True, context={'request': request})

		return Response(serializer.data)


class WatcherListView(APIView):
	def get(self, request, movie_slug):
		movie = Movie.objects.get(slug=movie_slug)

		if request.user.is_authenticated:
			friends = list(map(lambda f: f.dester, FriendShip.objects.filter(sender=request.user))) + list(
				map(lambda f: f.sender, FriendShip.objects.filter(dester=request.user)))
			people = Watcher.objects.filter(user__in=friends, movie=movie) | Watcher.objects.filter(
				movie=movie)
		else:
			people = Watcher.objects.filter(movie=movie)
		serializer = WatcherListSerializer(people, many=True, context={'request': request})

		return Response(serializer.data)


class AddMarkView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		movie = Movie.objects.get(slug=request.data['movie'])

		try:
			mark = Mark.objects.get(user=request.user, movie=movie)
			mark.value = request.data['value']
			mark.save()
		except:
			mark = Mark.objects.create(user=request.user, movie=movie, value=request.data['value'])
			mark.save()

		marks = Mark.objects.filter(movie=movie)
		try:
			review = Review.objects.get(author=request.user, movie=movie)
		except:
			review = None

		return Response(data={
			'rating': f'{reduce(lambda pm, m: pm + m.value, marks, 0) / len(marks):.1f}',
			'review': review if review is None else ReviewListSerializer(review, many=False,
																		 context={'request': request}).data
		}, status=status.HTTP_200_OK)


class GetMarkView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		movie = Movie.objects.get(slug=request.data['movie'])

		try:
			mark = Mark.objects.get(user=request.user, movie=movie)
			value = mark.value
		except:
			value = 0

		return Response(data={'rating': value}, status=status.HTTP_200_OK)


class CreateReview(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		movie = Movie.objects.get(slug=request.data['movie'])

		try:
			Review.objects.get(movie=movie, author=request.user)
			return Response(data={'status': 'exist'}, status=status.HTTP_400_BAD_REQUEST)
		except:
			review = Review.objects.create(title=request.data['title'], movie=movie, author=request.user,
										   permissions=request.data['permissions'], content=request.data['content'])
			review.save()
			return Response(ReviewListSerializer(review, context={'request': request}).data,
							status=status.HTTP_201_CREATED)


class CreateQuote(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		movie = Movie.objects.get(slug=request.data['movie'])

		quote = Quote.objects.create(hero=request.data['hero'], movie=movie, author=request.user,
									 permissions=request.data['permissions'], content=request.data['content'])
		quote.save()

		return Response(data=CreateQuoteListSerializer(quote).data, status=status.HTTP_201_CREATED)


class AddFriendView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		user = CustomUser.objects.get(username=request.data['username'])

		try:
			friends = FriendShip.objects.get(sender=user, dester=request.user)
			friends.status = 1
			friends.save()
		except:
			friends = FriendShip.objects.create(sender=request.user, dester=user)
			friends.save()

		return Response(data={'status': 'success'}, status=status.HTTP_200_OK)


class SearchView(APIView):
	def get(self, request, query):
		movies = list(filter(lambda m: query.lower() in m.title.lower(), Movie.objects.all()))

		return Response(MovieListSerializer(movies, many=True).data, status=status.HTTP_200_OK)


class FriendsNotAcceptView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		return Response({'count': len(FriendShip.objects.filter(dester=request.user, status=0))},
						status=status.HTTP_200_OK)


class FriendshipView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		users = list(map(lambda f: f.sender, FriendShip.objects.filter(dester=request.user, status=0)))

		return Response(CustomUserSerializer(users, many=True).data,
						status=status.HTTP_200_OK)


class changeFriendship(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		try:
			f = FriendShip.objects.get(dester=request.user, sender=CustomUser.objects.get(id=request.data['id']))
			f.status = request.data['status']
			f.save()
			return Response({'status': 'OK'}, status=status.HTTP_200_OK)
		except:
			return Response({'status': 'ERROR'}, status=status.HTTP_400_BAD_REQUEST)


class feedsView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		friends = list(map(lambda f: f.dester, FriendShip.objects.filter(sender=request.user, status=1))) + list(
			map(lambda f: f.sender, FriendShip.objects.filter(dester=request.user, status=1)))
		quotes = list(map(lambda q: {
			'type': 'quote',
			'data': {
				'id': q.id,
				'user': CustomUserSerializer(q.author).data,
				'movie': {'slug': q.movie.slug, 'title': q.movie.title},
				'date': q.date},
			'content': q.content
		}, Quote.objects.filter(Q(permissions=0) | Q(permissions=1), author__in=friends)))
		reviews = list(map(lambda r: {
			'type': 'review',
			'data': {
				'id': r.id,
				'user': CustomUserSerializer(r.author).data,
				'movie': {'slug': r.movie.slug, 'title': r.movie.title},
				'date': r.date},
			'content': r.content
		}, Review.objects.filter(Q(permissions=0) | Q(permissions=1), author__in=friends)))
		views = list(map(lambda v: {
			'type': 'view',
			'data': {
				'id': v.id,
				'user': CustomUserSerializer(v.user).data,
				'movie': {'slug': v.movie.slug, 'title': v.movie.title},
				'date': v.date},
			'content': ''
		}, Watcher.objects.filter(user__in=friends)))
		marks = list(map(lambda m: {
			'type': 'mark',
			'data': {
				'id': m.id,
				'user': CustomUserSerializer(m.user).data,
				'movie': {'slug': m.movie.slug, 'title': m.movie.title},
				'date': m.date
			},
			'content': str(m.value)
		}, Mark.objects.filter(user__in=friends)))
		feeds = sorted(views + marks + quotes + reviews, key=lambda i: i['data']['date'], reverse=True)
		return Response(feeds, status=status.HTTP_200_OK)

class addWatcherView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def post(self, request):
		movie = Movie.objects.get(slug=request.data['movie'])
		try:
			Watcher.objects.get(user=request.user, movie=movie)
		except:
			watcher = Watcher.objects.create(user=request.user, movie=movie)
			watcher.save()

		return Response({'status': 'OK'}, status=status.HTTP_200_OK)


class profileView(APIView):
	permission_classes = (permissions.IsAuthenticated,)

	def get(self, request):
		return Response(CustomUserFullSerializer(request.user).data, status=status.HTTP_200_OK)

	def post(self, request):
		serializer = CustomUserFullSerializer(request.user, data=request.data)
		print(request.data)
		if serializer.is_valid():
			print('valid')
			user = serializer.save()
			print(user)
		# user.first_name = request.data['first_name']
		# user.last_name = request.data['last_name']
		# if 'avatar' in request.data:
		# 	user.photo = request.data['avatar']
		# user.save()
		else:
			print('not valid')
		return Response({'status': 'OK'}, status=status.HTTP_200_OK)
