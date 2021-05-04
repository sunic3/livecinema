import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useInput } from '../../helpers/formHooks';
import Input from './Input';
import styles from './AuthForm.module.scss';
import { regUser } from '../../services/requestMock';
import { login } from '../../helpers/authHelper';
import BigButton from '../buttons/BigButton';
import { closeAuthForm } from '../../redux/auth/actions';

type RegistrationFormProps = {};

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const {
    value: username,
    isDirty: usernameDirty,
    setIsDirty: setUsernameDirty,
    onChange: onUsernameChange,
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
  const {
    value: password2,
    isDirty: password2Dirty,
    setIsDirty: setPassword2Dirty,
    onError: onPassword2Error,
    onChange: onPassword2Change,
  } = useInput('', {});
  const [error, setError] = useState(false);

  const dispatch = useDispatch()

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    regUser(username, password, password2).then(
      (data) => {
        if (data.access && data.refresh) {
          login(data);
          dispatch(closeAuthForm())
        } else {
          setError(true);
          setUsernameDirty(false);
          setPasswordDirty(false);
          setPassword2Dirty(false);
          onPasswordError();
          onPassword2Error();
        }
      },
      (err) => {
        throw new Error(err);
      }
    );
  };

  return (
    <form noValidate className={styles.form} onSubmit={onSubmit}>
      <h2 className={styles.formHeader}>Регистрация</h2>
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
        isDirty={usernameDirty}
        valid={usernameValid()}
        placeholder="Е-мэйл"
      />
      <Input
        inputType="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
        isDirty={passwordDirty}
        valid={passwordValid() || (password2Dirty && password !== password2)}
        placeholder="Пароль"
      />
      <Input
        inputType="password"
        name="password2"
        value={password2}
        onChange={onPassword2Change}
        isDirty={password2Dirty}
        valid={password !== password2}
        placeholder="Повторите пароль"
      />
      <BigButton
        type="submit"
        disabled={usernameValid() || passwordValid() || password !== password2}
      >
        Войти
      </BigButton>
    </form>
  );
};

export default RegistrationForm;
