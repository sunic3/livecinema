import React, { useEffect, useState } from 'react';

import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

import { getGenresReq, getMoviesReq } from '../../services/requestMock';

import { GenreType, MovieShort } from '../../interfaces';

const GenresAllPage: React.FC = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Array<{
    genre: GenreType;
    movies: MovieShort[] | null;
  }> | null>(null);

  useEffect(() => {
    getGenresReq()
      .then((genres) => {
        setMoviesByGenre(genres.map((genre) => ({ genre, movies: null })));
        return genres;
      })
      .then((genres) => {
        genres.forEach((genre) => {
          getMoviesReq({ genre: genre.slug }).then((data) =>
            setMoviesByGenre((prevState) => [
              ...(prevState?.map((state) =>
                state.genre.id !== genre.id
                  ? state
                  : { genre: state.genre, movies: data.movies }
              ) || []),
            ])
          );
        });
      });
  }, []);

  if (!moviesByGenre) return <Loader />;

  return (
    <>
      {moviesByGenre
        .filter((mdb) => mdb.movies === null || mdb.movies.length > 0)
        .map((mbd) => (
          <MovieList
            title={mbd.genre.name}
            movies={mbd.movies}
            key={mbd.genre.id}
          />
        ))}
    </>
  );
};

export default GenresAllPage;
