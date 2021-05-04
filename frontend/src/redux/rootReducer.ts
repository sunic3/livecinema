import { combineReducers } from 'redux';

import quotes from './quotes/reducer'
import reviews from './reviews/reducer'
import theme from './theme/reducer'
import auth from './auth/reducer';

const rootReducer = combineReducers({
  theme,
  auth,
  quotes,
  reviews,
});

export default rootReducer;
