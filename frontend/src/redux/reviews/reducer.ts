import { QuotesActionType, LOAD_QUOTES } from './actions';

export default function quotesReducer(
  state = {},
  action: QuotesActionType
) {
  switch (action.type) {
    case LOAD_QUOTES:
      return { [action.payload.slug]: action.payload.data };
    default:
      return state;
  }
}
