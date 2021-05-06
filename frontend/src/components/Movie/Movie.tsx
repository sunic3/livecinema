import React from 'react';
import cn from 'classnames';

import StarRoundedIcon from '@material-ui/icons/StarRounded';

import styles from './Movie.module.scss';

import Poster from '../Poster';
import { MovieShort } from '../../interfaces';

type MovieProps = {
  movie: MovieShort | null;
  className?: string;
  onClick?: () => void;
};

const Movie: React.FC<MovieProps> = ({ movie, className = null, onClick }) => {
  if (!movie) {
    return (
      <div className={cn(styles.movie_null, className)}>
        <div className={styles.back}>
          <Poster poster={null} />
        </div>
        <div className={styles.front} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.movie,
        movie.posterUrl ? null : styles.noPoster,
        className
      )}
      onClick={onClick}
    >
      <div className={styles.back}>
        <Poster poster={movie.posterUrl} />
      </div>
      <div className={styles.front}>
        {movie.rating !== '0.0' && (
          <div className={styles.rating}>
            <span>{movie.rating}</span>
            <StarRoundedIcon className={styles.star} fontSize="small" />
          </div>
        )}
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.footer}>
          <div className={styles.genre}>{movie.genres.join(', ')}</div>
          <div className={styles.year}>{movie.year}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
