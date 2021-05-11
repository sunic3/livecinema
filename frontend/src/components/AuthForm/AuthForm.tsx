import React, { useState } from 'react';

import styles from './AuthForm.module.scss';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthForm: React.FC = () => {
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
