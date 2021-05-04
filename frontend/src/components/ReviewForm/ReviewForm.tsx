import React, { useState } from 'react';
import { Select } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TextareaMarkdownEditor from 'react-textarea-markdown-editor';
import MenuItem from '@material-ui/core/MenuItem';
import md from '../../helpers/md';

import styles from './ReviewForm.module.scss';

import { useInput } from '../../helpers/formHooks';
import Input from '../AuthForm/Input';
import BigButton from '../buttons/BigButton';
import { authFetch } from '../../helpers/authHelper';
import { createReviewReq } from '../../services/requestMock';
import { addReviewAction } from '../../redux/reviews/actions';

type ReviewFormProps = {
  movie: {
    title: string;
    slug: string;
  };
  onClose: () => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    value: title,
    isDirty: titleDirty,
    onChange: onTitleChange,
    checkValid: titleValid,
  } = useInput('', {
    isEmpty: true,
  });

  const [content, setContent] = useState('');
  const [perm, setPerm] = useState(0);

  const textareaValid = () => content.length === 0;

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    authFetch().then((token) =>
      createReviewReq(token, {
        movie: movie.slug,
        title,
        content,
        permissions: perm,
      })
        .then((review) => {
          dispatch(addReviewAction(review));
          onClose();
          history.location.pathname !== `/movie/${movie.slug}/reviews` &&
            history.push(`/movie/${movie.slug}/reviews`);
        })
        .catch((err) => {})
    );
  };

  return (
    <div className={styles.reviewForm}>
      <h2 className={styles.title}>
        Напишите рецензию на фильм <span>"{movie.title}"</span>
      </h2>
      <form noValidate onSubmit={onSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="title_id">
          Заголовок рецензии
          <Input
            name="title"
            id="title_id"
            value={title}
            isDirty={titleDirty}
            onChange={onTitleChange}
            valid={titleValid()}
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="content_id">
          Текст рецензии
          <TextareaMarkdownEditor
            id="content_id"
            onChange={(value) => {
              setContent(value);
              return {};
            }}
            doParse={(text) => md.render(text)}
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
              disabled={titleValid() || textareaValid()}
            >
              Сохранить
            </BigButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
