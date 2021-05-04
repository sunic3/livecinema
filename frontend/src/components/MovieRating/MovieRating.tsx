import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { Rating } from '@material-ui/lab';

import styles from './MovieRating.module.scss';

import { authFetch, useAuth } from '../../helpers/authHelper';
import { addMarkReq } from '../../services/requestMock';
import { openAuthForm } from '../../redux/auth/actions';
import { updateReviews } from '../../redux/reviews/actions';

type MovieRatingProps = {
  rating: string;
  movieSlug: string;
  defaultValue: number;
};

const MovieRating: React.FC<MovieRatingProps> = ({
  rating,
  movieSlug,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [movieRating, setMovieRating] = useState(rating);
  const [clicked, setClicked] = useState(false);
  const [logged] = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (clicked && logged) {
      authFetch()
        .then((token) => addMarkReq(token, movieSlug, value))
        .then(({ rating: newMovieRating, review }) => {
          setMovieRating(newMovieRating);
          review && dispatch(updateReviews(review));
        })
        .catch((err) => {
          console.log(err.message);
          Promise.resolve();
        });
      setClicked(false);
    } else if (clicked && !logged) {
      (async () => {
        await new Promise((resolve) => {
          dispatch(openAuthForm(resolve));
        });
        setClicked(false);
      })();
    } else if (!clicked && !logged) {
      setValue(0);
    }
  }, [logged, clicked, value]);

  return (
    <div className={styles.movieRating}>
      {movieRating !== '0.0' && (
        <>
          <span className={styles.value}>{movieRating}</span>
          <StarRoundedIcon className={styles.star} fontSize="large" />
        </>
      )}
      <Rating
        key={`rating-${value}`}
        name="customized-color"
        value={value}
        defaultValue={0}
        precision={1}
        icon={<StarRoundedIcon fontSize="large" />}
        onChange={(_, newValue) => {
          newValue && setValue(newValue);
          setClicked(true);
        }}
        classes={{ iconEmpty: styles.iconEmpty }}
      />
    </div>
  );
};
export default MovieRating;
