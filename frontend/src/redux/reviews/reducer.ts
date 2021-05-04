import { ReviewsActionType } from './actions';
import { Review } from '../../interfaces';
import {
  LOAD_REVIEWS,
  ADD_REVIEW,
  RESET_REVIEWS,
  UPDATE_REVIEW,
} from './actionTypes';

export default function reviewsReducer(
  state: {
    slug: string;
    logged: boolean;
    own_review: boolean;
    reviews: Review[] | null;
  } = {
    slug: '',
    logged: false,
    own_review: false,
    reviews: null,
  },
  action: ReviewsActionType
) {
  switch (action.type) {
    case RESET_REVIEWS:
      return { slug: '', logged: false, own_review: false, reviews: null };
    case LOAD_REVIEWS:
      return {
        slug: action.payload.slug,
        logged: action.payload.logged,
        own_review: action.payload.own_review,
        reviews: action.payload.data,
      };
    case ADD_REVIEW:
      if (!state.slug) return { ...state, own_review: true };
      return {
        ...state,
        own_review: true,
        reviews: [action.payload, ...(state.reviews || [])],
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: [
          action.payload,
          ...(state.reviews?.filter((r) => r.id !== action.payload.id) || []),
        ],
      };
    default:
      return state;
  }
}
