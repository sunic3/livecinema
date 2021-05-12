import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useParams, NavLink } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { useDispatch, useSelector } from 'react-redux';
import { getMovie } from '../../services/requestMock';

import styles from './MoviePage.module.scss';

import Poster from '../../components/Poster';
import BigButton from '../../components/buttons/BigButton';
import Trailer from '../../components/Trailer/Trailer';
import ActorList from '../../components/actors/ActorList/ActorList';
import ServiceList from '../../components/Service/ServiceList';
import ReviewItems from '../../components/Review/ReviewItems';
import { authFetch, useAuth } from '../../helpers/authHelper';
import MovieRating from '../../components/MovieRating/MovieRating';
import QuoteItems from '../../components/Quote/QuoteItems';
import AuthModal from '../../components/AuthModal';
import QuoteForm from '../../components/movieForms/QuoteForm';
import ReviewForm from '../../components/movieForms/ReviewForm';
import WatcherItems from '../../components/Watcher/WatcherItems';
import Loader from '../../components/Loader/Loader';

import { resetReviewsAction } from '../../redux/reviews/actions';
import { resetQuotesAction } from '../../redux/quotes/actions';
import { AppState } from '../../redux/store';

import { BUTTON_REVIEW, BUTTON_TRAILER } from '../../constants';
import { Movie } from '../../interfaces';
import MobileMenuScroll from '../../components/MobileMenuScroll/MobileMenuScroll';
import WatcherForm from '../../components/WatcherForm/WatcherForm';

type MoviePageProps = {};

const MoviePage: React.FC<MoviePageProps> = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>();
  const [logged] = useAuth();

  const dispatch = useDispatch();
  const review = useSelector<AppState, boolean>(
    (state) => state.reviews.own_review
  );

  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);

  const [showTrailer, setShowTrailer] = useState(false);
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showAddQuote, setShowAddQuote] = useState(false);
  const [showAddWatcher, setShowAddWatcher] = useState(false);

  useEffect(() => {
    dispatch(resetReviewsAction);
    dispatch(resetQuotesAction);

    authFetch()
      .then((token) =>
        getMovie(movieSlug, {
          method: 'GET',
          headers: { Authorization: `JWT ${token}` },
        })
      )
      .catch((err) => {
        if (err.message === 'no token') {
          return getMovie(movieSlug);
        }
        throw err;
      })
      .then((data) => setMovie(data))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieSlug, logged]);

  if (loading) return <Loader />;

  if (!movie) {
    throw new Error('no movie');
  }

  const openTrailer = () => {
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const openCreateReview = () => {
    setShowCreateReview(true);
  };

  const closeCreateReview = () => {
    setShowCreateReview(false);
  };

  const openAddQuote = () => {
    setShowAddQuote(true);
  };

  const closeAddQuote = () => {
    setShowAddQuote(false);
  };

  const onAddWatcher = () => {
    setMovie(
      (prevState) =>
        ({
          ...prevState,
          watched: true,
        } as Movie)
    );
  };

  const openAddWatcher = () => {
    setShowAddWatcher(true);
  };

  const closeAddWatcher = () => {
    setShowAddWatcher(false);
  };

  return (
    <section>
      <div className={styles.title__mobile}>
        <span className={styles.title__name}>{movie.info.title}</span>
        <span className={styles.title__age}>{`(${movie.info.age}+)`}</span>
        <div className={styles.genre}>
          {movie.info.genres.map((g) => (
            <Link to={`/genres/${g.slug}`} key={g.id}>
              {g.name}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.left}>
          {movie.info.posterUrl && <Poster poster={movie.info.posterUrl} />}
          {movie.watched ? (
            <BigButton>
              <>
                <VisibilityIcon className={styles.left_menu_icon} />
                Просмотрен
              </>
            </BigButton>
          ) : (
            <BigButton onClick={openAddWatcher}>
              <>
                <AddIcon className={styles.left_menu_icon} />
                Добавить
              </>
            </BigButton>
          )}
          {movie.info.trailer && (
            <BigButton type={BUTTON_TRAILER} onClick={openTrailer}>
              <>
                <PlayArrowIcon className={styles.left_menu_icon} />
                Трейлер
              </>
            </BigButton>
          )}
          {!movie.review && !review && (
            <BigButton type={BUTTON_REVIEW} onClick={openCreateReview}>
              <>
                <CreateIcon className={styles.left_menu_icon} />
                Рецензия
              </>
            </BigButton>
          )}
          <BigButton type={BUTTON_REVIEW} onClick={openAddQuote}>
            <>
              <FormatQuoteIcon className={styles.left_menu_icon} />
              Цитаты
            </>
          </BigButton>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h1 className={styles.title__name}>{movie.info.title}</h1>
            <h1 className={styles.title__age}>{`(${movie.info.age}+)`}</h1>
          </div>
          <div className={styles.genre}>
            {movie.info.genres.map((g) => (
              <Link to={`/genres/${g.slug}`} key={g.id}>
                {g.name}
              </Link>
            ))}
          </div>
          <MovieRating
            rating={movie.info.rating}
            movieSlug={movieSlug}
            defaultValue={movie.rating}
          />
          <div className={styles.description}>
            {movie.info.short_description}
          </div>
          <div className={styles.section}>
            <h2>Режиссер и Актеры</h2>
            <div style={{ width: '100%' }}>
              <ActorList
                data={[
                  { ...movie.info.director, ...{ id: 0 } },
                  ...movie.info.actors,
                ]}
                movieSlug={movieSlug}
              />
            </div>
          </div>
          {movie.services.length !== 0 ? (
            <div className={styles.whereWatch}>
              <h2>Где посмотреть</h2>
              <ServiceList data={movie.services} />
            </div>
          ) : null}
          <MobileMenuScroll
            data={[
              {
                id: 0,
                children: (
                  <NavLink
                    to={`/movie/${movieSlug}`}
                    className={styles.movie_navlink}
                    activeClassName={styles.movie_navlink__active}
                    exact={true}
                  >
                    О фильме
                  </NavLink>
                ),
              },
              {
                id: 1,
                children: (
                  <NavLink
                    to={`/movie/${movieSlug}/reviews`}
                    className={styles.movie_navlink}
                    activeClassName={styles.movie_navlink__active}
                  >
                    Обзоры
                  </NavLink>
                ),
              },
              {
                id: 2,
                children: (
                  <NavLink
                    to={`/movie/${movieSlug}/quotes`}
                    className={styles.movie_navlink}
                    activeClassName={styles.movie_navlink__active}
                  >
                    Киноцитаты
                  </NavLink>
                ),
              },
              {
                id: 3,
                children: (
                  <NavLink
                    to={`/movie/${movieSlug}/viewers`}
                    className={styles.movie_navlink}
                    activeClassName={styles.movie_navlink__active}
                  >
                    Зрители
                  </NavLink>
                ),
              },
            ]}
            margin={20}
          />
          <Switch>
            <Route path={`/movie/${movieSlug}`} exact={true}>
              <div className={styles.about}>{movie.info.description}</div>
            </Route>
            <Route path={`/movie/${movieSlug}/reviews`}>
              <div className={styles.section}>
                <ReviewItems slug={movieSlug} addReview={openCreateReview} />
              </div>
            </Route>
            <Route path={`/movie/${movieSlug}/quotes`}>
              <div className={styles.section}>
                <QuoteItems slug={movieSlug} addQuote={openAddQuote} />
              </div>
            </Route>
            <Route path={`/movie/${movieSlug}/viewers`}>
              <div className={styles.section}>
                <WatcherItems slug={movieSlug} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
      {movie.info.trailer && showTrailer && (
        <Trailer src={movie.info.trailer} onClose={closeTrailer} />
      )}
      {showCreateReview && !movie.review && !review && (
        <AuthModal
          onClose={closeCreateReview}
          form={
            <ReviewForm
              movie={{ title: movie.info.title, slug: movieSlug }}
              onClose={closeCreateReview}
            />
          }
        />
      )}
      {showAddQuote && (
        <AuthModal
          onClose={closeAddQuote}
          form={
            <QuoteForm
              movie={{ title: movie.info.title, slug: movieSlug }}
              onClose={closeAddQuote}
            />
          }
        />
      )}
      {showAddWatcher && (
        <AuthModal
          onClose={closeAddWatcher}
          form={
            <WatcherForm
              onAdd={onAddWatcher}
              onClose={closeAddWatcher}
              movieSlug={movieSlug}
            />
          }
        />
      )}
    </section>
  );
};

export default MoviePage;
