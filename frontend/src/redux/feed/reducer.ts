import { FEED_COUNT, FEED_INCREASE, FeedActionsType } from './actions';

export default function feedReducer(
  state: number = 0,
  action: FeedActionsType
) {
  switch (action.type) {
    case FEED_COUNT: {
      return action.payload;
    }
    case FEED_INCREASE: {
      return Math.max(state - 1, 0);
    }
    default:
      return state;
  }
}
