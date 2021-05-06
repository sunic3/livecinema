import { combineReducers } from 'redux';

import quotes from './quotes/reducer';
import reviews from './reviews/reducer';
import theme from './theme/reducer';
import feed from './feed/reducer';
import auth from './auth/reducer';

const rootReducer = combineReducers({
  auth,
  feed,
  theme,
  quotes,
  reviews,
});

export default rootReducer;
