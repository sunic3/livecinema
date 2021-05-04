import {
  Movie,
  MovieShort,
  Review,
  Quote,
  Watcher,
  GenreType,
} from '../interfaces';
import { BACKEND } from '../constants';

export const fetchResponse = async <T>(url: string, init?: {}): Promise<T> =>
  fetch(`${BACKEND}/api/${url}`, init).then((r) => r.json());

export const getMoviesReq: (params?: {}) => Promise<{
  data: {};
  movies: MovieShort[];
}> = (params) =>
  fetchResponse(
    params ? `movies?${new URLSearchParams(params).toString()}` : 'movies'
  );

export const getGenresReq: () => Promise<GenreType[]> = () =>
  fetchResponse('genres');

export const getMovie: (
  slug: string,
  init?: { method: 'GET'; headers: { Authorization: string } }
) => Promise<Movie> = (slug, init) => fetchResponse(`movie/${slug}`, init);

export const getReviewsReq: (
  slug: string,
  init?: { method: 'GET'; headers: { Authorization: string } }
) => Promise<Review[]> = (slug, init) => fetchResponse(`reviews/${slug}`, init);

export const getQuotesReq: (
  slug: string,
  init?: { method: 'GET'; headers: { Authorization: string } }
) => Promise<Quote[]> = (slug, init) => fetchResponse(`quotes/${slug}`, init);

export const getWatchersReq: (
  slug: string,
  token?: string
) => Promise<Watcher[]> = (slug, token) =>
  fetchResponse(
    `watchers/${slug}`,
    token && { method: 'GET', headers: { Authorization: `JWT ${token}` } }
  );

export const addFriendReq: (
  username: string,
  token: string
) => Promise<{ status: string }> = (username, token) =>
  fetchResponse(`addfriend/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ username }),
  });

export const authUser: (
  username: string,
  password: string
) => Promise<{ access: string; refresh: string }> = (username, password) =>
  fetchResponse('auth/token/obtain/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

export const regUser: (
  username: string,
  password: string,
  password2: string
) => Promise<{ access: string; refresh: string }> = (
  username,
  password,
  password2
) =>
  fetchResponse('auth/user/create/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, password2 }),
  });

export const addMarkReq: (
  token: string,
  movie: string,
  value: number
) => Promise<{ rating: string; review: Review | null }> = (
  token,
  movie,
  value
) =>
  fetchResponse('addmark/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ movie, value }),
  });

export const getMarkReq: (
  token: string,
  movie: string
) => Promise<{ rating: number }> = (token, movie) =>
  fetchResponse('getmark/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ movie }),
  });

export const createReviewReq: (
  token: string,
  body: { movie: string; title: string; content: string; permissions: number }
) => Promise<Review> = (token, body) =>
  fetchResponse('createreview/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  });

export const createQuoteReq: (
  token: string,
  body: { movie: string; hero: string; content: string; permissions: number }
) => Promise<Quote> = (token, body) =>
  fetchResponse('createquote/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(body),
  });

export const makeSearchReq: (
  search: string,
  signal: AbortSignal
) => Promise<MovieShort[] | null> = (search, signal) =>
  search
    ? fetchResponse(`search/${search}`, { signal })
    : Promise.resolve(null);
