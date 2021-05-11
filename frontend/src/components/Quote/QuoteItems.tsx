import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Quote.module.scss';

import { loadQuotes } from '../../redux/quotes/actions';
import { AppState } from '../../redux/store';

import Loader from '../Loader/Loader';
import QuoteItem from './QuoteItem';

import { useAuth } from '../../helpers/authHelper';

import { Quote } from '../../interfaces';

type QuoteItemsProps = {
  slug: string;
  addQuote: () => void;
};

const QuoteItems: React.FC<QuoteItemsProps> = ({ slug, addQuote }) => {
  const [logged] = useAuth();

  const quotes = useSelector<AppState, Quote[] | null>(
    (state) => state.quotes.quotes
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQuotes(slug, logged));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, logged]);

  if (!quotes) return <Loader />;

  if (!quotes.length)
    return (
      <>
        <span className={styles.no_quotes}>
          Кажется, никто еще не добавил киноцитат из этого фильма.{' '}
        </span>
        <span className={styles.no_quotes_link} onClick={addQuote}>
          Будьте первым!
        </span>
      </>
    );

  return (
    <>
      {quotes.map((q) => (
        <QuoteItem quote={q} key={`${q.id}-${q.type}`} />
      ))}
    </>
  );
};

export default QuoteItems;
