import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './AuthForm.module.scss';

import BigButton from '../buttons/BigButton';

import { closeAuthForm } from '../../redux/auth/actions';

import { login } from '../../helpers/authHelper';
import { useInput } from '../../helpers/formHooks';

import Input from './Input';

import { authUser } from '../../services/requestMock';

const LoginForm: React.FC = () => {
  const {
    value: username,
    onChange: onUsernameChange,
    setIsDirty: setUsernameDirty,
  } = useInput('', {
    isEmpty: true,
  });
  const {
    value: password,
    setIsDirty: setPasswordDirty,
    onChange: onPasswordChange,
    onError: onPasswordError,
  } = useInput('', {
    isEmpty: true,
  });
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    authUser(username, password).then(
      (data) => {
        if (data.access && data.refresh) {
          login(data);
          dispatch(closeAuthForm());
        } else {
          setError(true);
          setUsernameDirty(false);
          setPasswordDirty(false);
          onPasswordError();
        }
      },
      (err) => {
        throw new Error(err);
      }
    );
  };

  return (
    <form noValidate className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.formHeader}>Вход</h2>
      {error && (
        <span className={styles.formHeader_span}>
          Почта или пароль указаны неверно
        </span>
      )}
      <Input
        inputType="email"
        name="username"
        value={username}
        onChange={onUsernameChange}
        onFocus={() => setError(false)}
        placeholder="Е-мэйл"
        errorText="Неверный формат"
      />
      <Input
        inputType="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
        onFocus={() => setError(false)}
        placeholder="Пароль"
        errorText="Короткий пароль"
      />
      <BigButton type="submit" disabled={!username || !password}>
        Войти
      </BigButton>
    </form>
  );
};

export default LoginForm;
