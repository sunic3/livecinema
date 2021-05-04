import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import { getGenresReq, getMoviesReq } from '../../services/requestMock';
import Loader from '../../components/Loader/Loader';

import { GenreType, MovieShort } from '../../interfaces';
import WatchListSection from '../../components/WatchList/WatchListSection';

const GenresPage: React.FC = () => {
  const [moviesByGenre, setMoviesByGenre] = useState<Array<{
    genre: GenreType;
    movies: MovieShort[] | null;
  }> | null>(null);

  useEffect(() => {
    getGenresReq()
      .then((data) => {
        setMoviesByGenre(data.map((genre) => ({ genre, movies: null })));
        return data;
      })
      .then((data) => {
        data.forEach((genre) => {
          getMoviesReq({ genre: genre.name }).then((movies) =>
            setMoviesByGenre((prevState) => [
              ...(prevState?.map((state) =>
                state.genre.id !== genre.id
                  ? state
                  : { genre: state.genre, movies }
              ) || []),
            ])
          );
        });
      });
  }, []);

  if (!moviesByGenre) return <Loader />;

  return (
    <>
      <Switch>
        <Route path="/genres" exact>
          {moviesByGenre
            .filter((mdb) => mdb.movies === null || mdb.movies.length > 0)
            .map((mbd) => (
              <WatchListSection
                title={mbd.genre.name}
                movies={mbd.movies}
                key={mbd.genre.id}
              />
            ))}
        </Route>
        <Route path="/genres/:genre">genre</Route>
      </Switch>
    </>
  );
};

export default GenresPage;
