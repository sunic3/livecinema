import React from 'react';

import styles from './GenresListSection.module.scss';

import Genre from './Genre';

import { GenreType } from '../../interfaces';

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
