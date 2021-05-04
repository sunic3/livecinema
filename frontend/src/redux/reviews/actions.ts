import { Quote } from '../../interfaces';

import { getQuotesReq } from '../../services/requestMock';
import { authFetch } from '../../helpers/authHelper';

export const LOAD_QUOTES = 'LOAD_QUOTES';

export type QuotesActionType = LoadQuotesType;

type LoadQuotesType = {
  type: typeof LOAD_QUOTES;
  payload: {
    slug: string;
    data: Quote[];
  };
};

export const loadQuotesAction: (
  slug: string,
  operations: Quote[]
) => LoadQuotesType = (slug, operations) => ({
  type: LOAD_QUOTES,
  payload: {
    slug,
    data: operations,
  },
});

// @ts-ignore
export const loadQuotes = (movieSlug: string) => (dispatch, getState) => {
  if (getState().quotes[movieSlug]) {
    dispatch({ type: 'EXIST' });
  } else {
    authFetch()
      .then((token) =>
        getQuotesReq(movieSlug, {
          method: 'GET',
          headers: { Authorization: `JWT ${token}` },
        })
      )
      .catch((err) => {
        if (err.message === 'no token') {
          return getQuotesReq(movieSlug);
        }
        throw err;
      })
      .then(
        (data) => dispatch(loadQuotesAction(movieSlug, data)),
        (err) => {
          window.console.log(err);
          throw err;
        }
      );
  }
};
