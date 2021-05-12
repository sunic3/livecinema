import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import styles from './GenrePage.module.scss';

import Loader from '../../components/Loader/Loader';
import Movie from '../../components/Movie/Movie';

import { plural } from '../../helpers/plural';
import { getMoviesReq } from '../../services/requestMock';

import { GenreType, MovieShort } from '../../interfaces';

const GenrePage: React.FC = () => {
  const { genreSlug } = useParams<{ genreSlug: string }>();
  const [genre, setGenre] = useState<GenreType | null>(null);
  const [movies, setMovies] = useState<MovieShort[] | null>(null);

  const history = useHistory();

  const onClick = (slug: string) => {
    history.push(`/movie/${slug}`);
  };

  useEffect(() => {
    getMoviesReq({ genre: genreSlug }).then((data) => {
      setGenre(data.data as GenreType);
      setMovies(data.movies);
    });
  }, [genreSlug]);

  if (!movies) return <Loader />;

  return (
    <>
      <h1 className={styles.title}>{`Мы нашли ${
        movies.length
      } ${plural(movies.length, ['фильм', 'фильма', 'фильмов'])} жанра ${
        genre?.name
      }`}</h1>
      <div className={styles.movies}>
        {movies.map((m) => (
          <Movie movie={m} key={m.id} onClick={() => onClick(m.slug)} />
        ))}
      </div>
    </>
  );
};

export default GenrePage;
