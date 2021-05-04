import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import { Select } from '@material-ui/core';

import styles from './QuoteForm.module.scss';

import Input from '../AuthForm/Input';
import BigButton from '../buttons/BigButton';
import { useInput } from '../../helpers/formHooks';
import { authFetch } from '../../helpers/authHelper';
import { createQuoteReq } from '../../services/requestMock';
import { addQuoteAction } from '../../redux/quotes/actions';

type QuoteFormProps = {
  movie: {
    title: string;
    slug: string;
  };
  onClose: () => void;
};

const QuoteForm: React.FC<QuoteFormProps> = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { value: hero, onChange: onHeroChange } = useInput('', {});

  const [content, setContent] = useState('');
  const [perm, setPerm] = useState(0);

  const textareaValid = () => content.length === 0;

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    authFetch().then((token) =>
      createQuoteReq(token, {
        movie: movie.slug,
        hero,
        content,
        permissions: perm,
      })
        .then((quote) => {
          dispatch(addQuoteAction(quote));
          onClose();
          history.location.pathname !== `/movie/${movie.slug}/quotes` && history.push(`/movie/${movie.slug}/quotes`)
        })
        .catch((err) => console.log(err))
    );
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>
        Добавьте киноцитату для фильма <span>"{movie.title}"</span>
      </h2>
      <form noValidate onSubmit={onSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="hero_id">
          Автор цитаты
          <Input
            name="hero"
            id="hero_id"
            value={hero}
            onChange={onHeroChange}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="content_id">
          Текст киноцитаты
          <textarea
            id="content_id"
            className={styles.textarea}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <div className={styles.footer}>
          <Select
            className={styles.select}
            defaultValue={0}
            onChange={(event) => setPerm(event.target.value as number)}
          >
            <MenuItem value={0}>Всем</MenuItem>
            <MenuItem value={1}>Друзьям</MenuItem>
            <MenuItem value={2}>Только мне</MenuItem>
          </Select>
          <div className={styles.buttons}>
            <BigButton
              type="cancel"
              className={styles.button}
              onClick={onClose}
            >
              Отмена
            </BigButton>
            <BigButton
              type="submit"
              className={styles.button}
              disabled={textareaValid()}
            >
              Сохранить
            </BigButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuoteForm;
