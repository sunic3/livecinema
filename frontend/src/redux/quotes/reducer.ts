import { QuotesActionType } from './actions';
import { LOAD_QUOTES, ADD_QUOTE, RESET_QUOTES } from './actionTypes';
import { Quote } from '../../interfaces';

export default function quotesReducer(
  state: {
    slug: string;
    logged: boolean;
    quotes: Quote[] | null;
  } = {
    slug: '',
    logged: false,
    quotes: [],
  },
  action: QuotesActionType
) {
  switch (action.type) {
    case RESET_QUOTES:
      return { slug: '', logged: false, quotes: null };
    case LOAD_QUOTES:
      return {
        slug: action.payload.slug,
        logged: action.payload.logged,
        quotes: action.payload.data,
      };
    case ADD_QUOTE:
      if (state.slug === '') return state;
      return { ...state, quotes: [action.payload, ...(state.quotes || [])] };
    default:
      return state;
  }
}
