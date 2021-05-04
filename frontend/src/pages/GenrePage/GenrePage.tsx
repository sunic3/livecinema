import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import styles from './Genre.module.scss';

import { GenreType, MovieShort } from '../../interfaces';
import Loader from '../../components/Loader/Loader';
import { getMoviesReq } from '../../services/requestMock';
import { plural } from '../../helpers/plural';
import Movie from '../../components/Movie/Movie';

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
