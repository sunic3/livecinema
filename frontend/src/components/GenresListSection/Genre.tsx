import React from 'react';
import { Link } from 'react-router-dom';

import styles from './GenresListSection.module.scss';

import { GenreType } from '../../interfaces';

type GenreProps = {
  genre: GenreType;
};

const Genre: React.FC<GenreProps> = ({ genre }) => (
  <div className={styles.genre}>
    <Link className={styles.link} to={`/genres/${genre.slug}`}>
      {genre.name}
    </Link>
  </div>
);

export default Genre;
