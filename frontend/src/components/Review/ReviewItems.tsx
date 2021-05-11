import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './review.module.scss';

import Loader from '../Loader/Loader';
import ReviewItem from './ReviewItem';

import { AppState } from '../../redux/store';
import { loadReviews } from '../../redux/reviews/actions';

import { useAuth } from '../../helpers/authHelper';

import { Review } from '../../interfaces';

type ReviewItemsProps = {
  slug: string;
  addReview: () => void;
};

const ReviewItems: React.FC<ReviewItemsProps> = ({ slug, addReview }) => {
  const [logged] = useAuth();

  const reviews = useSelector<AppState, Review[] | null>(
    (state) => state.reviews.reviews
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReviews(slug, logged));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, logged]);

  if (!reviews) return <Loader />;

  if (!reviews.length)
    return (
      <>
        <span className={styles.no_reviews}>
          Кажется, никто еще не добавил обзор на этот фильм.{' '}
        </span>
        <span className={styles.no_reviews_link} onClick={addReview}>
          Будьте первым!
        </span>
      </>
    );

  return (
    <>
      {reviews.map((review) => (
        <ReviewItem {...review} key={`${review.id}-${review.type}`} />
      ))}
    </>
  );
};

export default ReviewItems;
