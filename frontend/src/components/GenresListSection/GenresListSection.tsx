import React from 'react';

import styles from './GenresListSection.module.scss';
import { GenreType } from '../../interfaces';
import Genre from './Genre';

type GenresListSectionProps = {
  genres: GenreType[] | null;
};

const GenresListSection: React.FC<GenresListSectionProps> = ({ genres }) => (
  <section>
    <h1 className={styles.title}>Жанры</h1>
    {genres && (
      <div className={styles.genresContainer}>
        {genres.map((g) => (
          <Genre genre={g} key={g.id} />
        ))}
      </div>
    )}
  </section>
);

export default GenresListSection;
