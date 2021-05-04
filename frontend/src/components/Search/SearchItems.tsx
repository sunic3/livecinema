import React from 'react';
import { MovieShort } from '../../interfaces';

import styles from './Search.module.scss';
import SearchItem from './SearchItem';
import Loader from '../Loader/Loader';

type SearchItemsProps = {
  results: MovieShort[] | null;
};

const SearchItems: React.FC<SearchItemsProps> = ({ results }) => {
  if (!results) return <Loader />;

  if (!results.length)
    return (
      <span className={styles.no_results}>
        К сожалению, по вашему запросу ничего не найдено...
      </span>
    );

  return (
    <>
      {results.map((movie) => (
        <SearchItem data={movie} key={movie.id} />
      ))}
    </>
  );
};

export default SearchItems;
