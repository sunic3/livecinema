import {
  BUTTON_REVIEW,
  BUTTON_TRAILER,
  BUTTON_SUBMIT,
  DARK_THEME,
  LIGHT_THEME,
  BUTTON_CANCEL,
} from './constants';

export type ThemeType = typeof LIGHT_THEME | typeof DARK_THEME;

export type AuthFormType = {
  show: boolean;
  resolvers: Array<() => void>;
};

export type ButtonType =
  | typeof BUTTON_TRAILER
  | typeof BUTTON_REVIEW
  | typeof BUTTON_SUBMIT
  | typeof BUTTON_CANCEL;

export type NavType = {
  id: number;
  title: string;
  href: string;
  exact?: boolean;
};

export type GenreType = {
  id: number;
  name: string;
  slug: string;
};

export type PermType = 'self' | 'friend' | 'default';

export type ActorType = {
  id: number;
  name: string;
  slug?: string;
  photo: string | null;
};

export type ServiceType = {
  id: number;
  service: {
    name: string;
    logo: string;
  };
  type: number;
  link: string;
  money?: number;
};

export interface MovieShort {
  id: number;
  title: string;
  slug: string;
  genres: GenreType[];
  year: number;
  posterUrl: string | null;
  country: string;
  rating: string;
}

export interface MovieInfo extends MovieShort {
  description: string;
  short_description: string;
  trailer: string | null;
  age: number;
  director: ActorType;
  actors: ActorType[];
}

export interface Movie {
  info: MovieInfo;
  services: ServiceType[];
  rating: number;
  review: boolean;
  watched: boolean;
}

export interface User {
  id: number;
  username: string;
  first_name: string | null;
  photo: string | null;
}

export interface UserFull extends User {
  last_name: string | null;
}

export interface Review {
  id: number;
  title: string;
  author: User;
  date: string;
  content: string;
  rating: number | null;
  type: PermType;
  permissions: number;
}

export interface Quote {
  id: number;
  author: User;
  date: string;
  hero: string | null;
  content: string;
  type: PermType;
  permissions: number;
}

export interface Watcher {
  id: number;
  user: User;
  movies: {
    all: number;
    match: number;
  };
  rating: number;
  status: number;
}

interface Feed {
  type: string;
  data: {
    id: number;
    user: User;
    movie: {
      slug: string;
      title: string;
    };
    date: string;
  };
  content: string;
}

export interface FeedView extends Feed {
  type: 'view';
}

export interface FeedRating extends Feed {
  type: 'mark';
}

export interface FeedReview extends Feed {
  type: 'review';
}

export interface FeedQuote extends Feed {
  type: 'quote';
}

export type FeedType = FeedView | FeedRating | FeedReview | FeedQuote;
