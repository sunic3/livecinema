import { Quote } from '../../interfaces';

import { getQuotesReq } from '../../services/requestMock';
import { authFetch } from '../../helpers/authHelper';

import { ADD_QUOTE, LOAD_QUOTES, RESET_QUOTES } from './actionTypes';

export type QuotesActionType = LoadQuotesType | AddQuoteType | ResetQuotesType;

type ResetQuotesType = {
  type: typeof RESET_QUOTES;
};

type LoadQuotesType = {
  type: typeof LOAD_QUOTES;
  payload: {
    slug: string;
    logged: boolean;
    data: Quote[];
  };
};

type AddQuoteType = {
  type: typeof ADD_QUOTE;
  payload: Quote;
};

export const resetQuotesAction: ResetQuotesType = {
  type: RESET_QUOTES,
};

export const loadQuotesAction: (
  slug: string,
  logged: boolean,
  quotes: Quote[]
) => LoadQuotesType = (slug, logged, quotes) => ({
  type: LOAD_QUOTES,
  payload: {
    slug,
    logged,
    data: quotes,
  },
});

export const addQuoteAction: (quote: Quote) => AddQuoteType = (quote) => ({
  type: ADD_QUOTE,
  payload: quote,
});

export const loadQuotes = (movieSlug: string, logged: boolean) => (
  dispatch: (arg0: {
    type: string;
    payload?: { slug: string; data: Quote[] };
  }) => void,
  getState: () => {
    (): any;
    new (): any;
    quotes: { (): any; new (): any; logged: boolean; slug: string };
  }
) => {
  if (
    getState().quotes.logged === logged &&
    getState().quotes.slug === movieSlug
  ) {
    dispatch({ type: '' });
    return;
  }

  dispatch(resetQuotesAction);

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
      (data) => dispatch(loadQuotesAction(movieSlug, logged, data)),
      (err) => {
        window.console.log(err);
        throw err;
      }
    );
};
