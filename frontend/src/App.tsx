import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';

import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.css';

import './themes.scss';
import styles from './App.module.scss';

import { AppState } from './redux/store';
import { authFetch, useAuth } from './helpers/authHelper';
import AuthFormModal from './components/AuthForm/AuthFormModal';

import Header from './components/Header/Header';
import Wrapper from './components/Wrapper/Wrapper';
import MainPage from './pages/MainPage/MainPage';
import MoviePage from './pages/MoviePage/MoviePage';
import FeedPage from './pages/FeedPage/FeedPage';
import GenresAllPage from './pages/GenresAllPage/GenresAllPage';
import GenrePage from './pages/GenrePage/GenrePage';
import Footer from './components/Footer/Footer';

import { friendsNotAcceptReq } from './services/requestMock';

import { ThemeType } from './interfaces';
import { feedChange } from './redux/feed/actions';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App: React.FC = (props) => {
  const theme = useSelector<AppState, ThemeType>((state) => state.theme);
  const [logged] = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (logged) {
      interval = setInterval(
        () =>
          authFetch()
            .then((token) => friendsNotAcceptReq(token))
            .then((data) => {
              dispatch(
                feedChange(
                  window.location.pathname === '/feed' ? 0 : data.count
                )
              );
            }),
        1000
      );
    } else {
      dispatch(feedChange(0));
    }

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  return (
    <div className={cn(styles.content, theme)}>
      <Header />
      <Wrapper>
        <>
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/genres" exact>
              <GenresAllPage />
            </Route>
            <Route path="/feed" exact>
              <FeedPage />
            </Route>
            <Route path="/genres/:genreSlug" exact>
              <GenrePage />
            </Route>
            <Route path="/movie/:movieSlug/">
              <MoviePage />
            </Route>
            {logged ? (
              <Route path="/profile">
                <ProfilePage />
              </Route>
            ) : null}
            <Route render={() => <Redirect to={{ pathname: '/' }} />} />
          </Switch>
          <Footer />
        </>
      </Wrapper>
      <AuthFormModal />
    </div>
  );
};

export default App;
