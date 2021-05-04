import React from 'react';
import { useHistory } from 'react-router-dom';

import ScrollMenu from 'react-horizontal-scrolling-menu';

import styles from './WatchListSection.module.scss'
import '../../helpers/ScrollMenu.scss';

import Movie from '../Movie/Movie';
import { ArrowLeft, ArrowRight } from '../arrows';

import { MovieShort } from '../../interfaces';

type WatchListSectionProps = {
  title: string;
  movies: MovieShort[] | null;
};

const WatchListSection: React.FC<WatchListSectionProps> = ({
  title,
  movies,
}) => {
  const history = useHistory();

  const onSelect = (key: string | number | null) => {
    if (!key || !movies) {
      return;
    }

    const id = typeof key === 'string' ? Number.parseInt(key, 10) : key;
    const movie = movies.find((m) => m.id === id);

    if (movie) {
      history.push(`/movie/${movie.slug}`);
    }
  };

  return (
    <section>
      <h1>{title}</h1>
      {!movies ? (
        <ScrollMenu
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((m) => (
            <Movie movie={null} key={m} />
          ))}
          wheel={false}
          alignCenter={false}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={onSelect}
          hideArrows={true}
          hideSingleArrow={true}
          menuClass="menu"
        />
      ) : (
        <ScrollMenu
          data={movies.map((m) => (
            <Movie movie={m} key={m.id} className={styles.movie} />
          ))}
          wheel={false}
          alignCenter={false}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={onSelect}
          hideArrows={true}
          hideSingleArrow={true}
          menuClass="menu"
        />
      )}
    </section>
  );
};

export default WatchListSection;
