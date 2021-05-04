import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import BigButton from '../buttons/BigButton';

import styles from './AuthForm.module.scss';
import { authUser } from '../../services/requestMock';
import { login } from '../../helpers/authHelper';
import { useInput } from '../../helpers/formHooks';
import Input from './Input';
import { closeAuthForm } from '../../redux/auth/actions';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    value: username,
    isDirty: usernameDirty,
    onChange: onUsernameChange,
    setIsDirty: setUsernameDirty,
    checkValid: usernameValid,
  } = useInput('', {
    isEmpty: true,
    emailMatch: true,
  });
  const {
    value: password,
    isDirty: passwordDirty,
    setIsDirty: setPasswordDirty,
    onChange: onPasswordChange,
    onError: onPasswordError,
    checkValid: passwordValid,
  } = useInput('', {
    isEmpty: true,
    minLength: 8,
  });
  const [error, setError] = useState(false);

  const dispatch = useDispatch()

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    authUser(username, password).then(
      (data) => {
        if (data.access && data.refresh) {
          login(data);
          dispatch(closeAuthForm())
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
        isDirty={usernameDirty}
        valid={usernameValid()}
      />
      <Input
        inputType="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
        onFocus={() => setError(false)}
        placeholder="Пароль"
        isDirty={passwordDirty}
        valid={passwordValid()}
      />
      <BigButton type="submit" disabled={usernameValid() || passwordValid()}>
        Войти
      </BigButton>
    </form>
  );
};

export default LoginForm;
