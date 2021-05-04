import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import cn from 'classnames';

import 'react-textarea-markdown-editor/build/TextareaMarkdownEditor.css';

import './themes.scss';
import styles from './App.module.scss';

import Header from './components/Header/Header';
import { AppState } from './redux/store';
import { ThemeType } from './interfaces';
import MainPage from './pages/MainPage/MainPage';
import Wrapper from './components/Wrapper/Wrapper';
import MoviePage from './pages/MoviePage/MoviePage';
import { useAuth } from './helpers/authHelper';
import AuthFormModal from './components/AuthForm/AuthFormModal';
import Footer from './components/Footer/Footer';
import GenresAllPage from './pages/GenresAllPage/GenresAllPage';
import GenrePage from './pages/GenrePage/GenrePage';

const App: React.FC = (props) => {
  const theme = useSelector<AppState, ThemeType>((state) => state.theme);
  const [logged] = useAuth();

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
            <Route path="/genres/:genreSlug" exact>
              <GenrePage />
            </Route>
            <Route path="/movie/:movieSlug/">
              <MoviePage />
            </Route>
            {logged ? (
              <Route path="/profile">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Architecto aspernatur aut, dignissimos earum exercitationem
                  fugit mollitia officiis quae sed voluptates? Enim eveniet ex
                  explicabo, fugit iste labore non perferendis repudiandae!
                </div>
              </Route>
            ) : null}
            <Route render={() => <Redirect to={{ pathname: '/' }} />} />
          </Switch>
          <Footer/>
        </>
      </Wrapper>
      <AuthFormModal />
    </div>
  );
};

export default App;
