import React from 'react';
import { Link } from 'react-router-dom';

import StarRoundedIcon from '@material-ui/icons/StarRounded';

import styles from './Search.module.scss';

import { MovieShort } from '../../interfaces';

type SearchItemProps = {
  data: MovieShort;
};

const SearchItem: React.FC<SearchItemProps> = ({
  data: { title, slug, genres, posterUrl, rating, year, country },
}) => (
  <div className={styles.result_item}>
    <div className={styles.left}>
      <img className={styles.poster} src={posterUrl || '/movie_default.png'} />
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <h5 className={styles.genres}>{genres.join(', ')}</h5>
        <h5 className={styles.country}>
          {country}, {year}
        </h5>
      </div>
    </div>
    {rating !== '0.0' && (
      <div className={styles.rating}>
        <span>{rating}</span>
        <StarRoundedIcon className={styles.star} fontSize="large" />
      </div>
    )}
    <Link className={styles.link} to={`/movie/${slug}`} />
  </div>
);

export default SearchItem;
