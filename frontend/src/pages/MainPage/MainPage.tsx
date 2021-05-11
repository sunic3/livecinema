import React, { useEffect, useState } from 'react';

import MovieList from '../../components/MovieList/MovieList';
import GreetBlock from '../../components/GreetBlock/GreetBlock';
import GenresListSection from '../../components/GenresListSection/GenresListSection';

import { getMoviesReq, getGenresReq } from '../../services/requestMock';

import { GenreType, MovieShort } from '../../interfaces';

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<MovieShort[] | null>(null);
  const [newMovies, setNewMovies] = useState<MovieShort[] | null>(null);
  const [genres, setGenres] = useState<GenreType[] | null>(null);

  useEffect(() => {
    getMoviesReq({ limit: 10 }).then((data) => setMovies(data.movies));
    getMoviesReq({ new: true, limit: 10 }).then((data) =>
      setNewMovies(data.movies)
    );
    getGenresReq().then((data) => setGenres(data));
  }, []);

  return (
    <>
      <GreetBlock />
      <MovieList title="Что посмотреть" movies={movies} />
      <MovieList title="Новинки" movies={newMovies} />
      <GenresListSection genres={genres} />
    </>
  );
};

export default MainPage;
