import React, { useState } from 'react';

import styles from './AuthForm.module.scss';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

type AuthFormProps = {};

const AuthForm: React.FC<AuthFormProps> = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const onClick = () => {
    setShowLoginForm((prev) => !prev);
  };

  return (
    <div className={styles.authform}>
      {showLoginForm ? (
        <>
          <LoginForm />
          <h5 className={styles.formFooter}>
            Нет аккаунта?{' '}
            <span className={styles.formFooter_span} onClick={onClick}>
              Зарегистрироваться
            </span>
          </h5>
        </>
      ) : (
        <>
          <RegistrationForm />
          <h5 className={styles.formFooter}>
            Уже есть аккаунт?{' '}
            <span className={styles.formFooter_span} onClick={onClick}>
              Войти
            </span>
          </h5>
        </>
      )}
      <h5>{showLoginForm}</h5>
    </div>
  );
};
export default AuthForm;
