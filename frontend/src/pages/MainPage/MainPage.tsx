import React, { useEffect, useState } from 'react';
import WatchListSection from '../../components/WatchList/WatchListSection';
import GreetBlock from '../../components/GreetBlock/GreetBlock';
import GenresListSection from '../../components/GenresListSection/GenresListSection';
import { GenreType, MovieShort } from '../../interfaces';
import { getMoviesReq, getGenresReq } from '../../services/requestMock';

const MainPage: React.FC = () => {
  const [movies, setMovies] = useState<MovieShort[] | null>(null);
  const [newMovies, setNewMovies] = useState<MovieShort[] | null>(null);
  const [genres, setGenres] = useState<GenreType[] | null>(null);

  useEffect(() => {
    getMoviesReq().then((data) => setMovies(data.movies));
    getMoviesReq({ new: true }).then((data) => setNewMovies(data.movies));
    getGenresReq().then((data) => setGenres(data));
  }, []);

  return (
    <>
      <GreetBlock />
      <WatchListSection title="Что посмотреть" movies={movies} />
      <WatchListSection title="Новинки" movies={newMovies} />
      <GenresListSection genres={genres} />
    </>
  );
};

export default MainPage;
