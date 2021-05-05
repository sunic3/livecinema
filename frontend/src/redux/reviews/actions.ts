import { Review } from '../../interfaces';

import { getReviewsReq } from '../../services/requestMock';
import { authFetch } from '../../helpers/authHelper';

import {
  ADD_REVIEW,
  LOAD_REVIEWS,
  RESET_REVIEWS,
  UPDATE_REVIEW,
} from './actionTypes';

export type ReviewsActionType =
  | LoadReviewsType
  | AddReviewType
  | ResetReviewsType
  | UpdateReviewType;

type ResetReviewsType = {
  type: typeof RESET_REVIEWS;
};

type LoadReviewsType = {
  type: typeof LOAD_REVIEWS;
  payload: {
    slug: string;
    logged: boolean;
    own_review: boolean;
    data: Review[];
  };
};

type AddReviewType = {
  type: typeof ADD_REVIEW;
  payload: Review;
};

type UpdateReviewType = {
  type: typeof UPDATE_REVIEW;
  payload: Review;
};

export const resetReviewsAction: ResetReviewsType = {
  type: RESET_REVIEWS,
};

export const loadReviewsAction: (
  slug: string,
  logged: boolean,
  own_review: boolean,
  reviews: Review[]
) => LoadReviewsType = (slug, logged, own_review, reviews) => ({
  type: LOAD_REVIEWS,
  payload: {
    slug,
    logged,
    own_review,
    data: reviews,
  },
});

export const addReviewAction: (review: Review) => AddReviewType = (review) => ({
  type: ADD_REVIEW,
  payload: review,
});

export const loadReviews = (movieSlug: string, logged: boolean) => (
  dispatch: (arg0: {
    type: string;
    payload?: { slug: string; logged: boolean; data: Review[] };
  }) => void,
  getState: () => {
    (): any;
    new (): any;
    reviews: { (): any; new (): any; logged: boolean; slug: string };
  }
) => {
  if (
    getState().reviews.logged === logged &&
    getState().reviews.slug === movieSlug
  ) {
    dispatch({ type: 'EXIST' });
    return;
  }

  dispatch(resetReviewsAction);

  authFetch()
    .then((token) =>
      getReviewsReq(movieSlug, {
        method: 'GET',
        headers: { Authorization: `JWT ${token}` },
      })
    )
    .catch((err) => {
      if (err.message === 'no token') {
        return getReviewsReq(movieSlug);
      }
      throw err;
    })
    .then(
      (data) => dispatch(
          loadReviewsAction(
            movieSlug,
            logged,
            data.some((r) => r.type === 'self'),
            data
          )
        ),
      (err) => {
        window.console.log(err);
        throw err;
      }
    );
};

const updateReviewAction: (review: Review) => UpdateReviewType = (review) => ({
  type: UPDATE_REVIEW,
  payload: review,
});

export const updateReviews = (review: Review) => (
  dispatch: (arg0: UpdateReviewType) => any,
  getState: () => {
    (): any;
    new (): any;
    reviews: { (): any; new (): any; slug: any };
  }
) => {
  getState().reviews.slug && dispatch(updateReviewAction(review));
};
