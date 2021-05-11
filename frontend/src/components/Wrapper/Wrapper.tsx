import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import styles from './Wrapper.module.scss';

function ErrorFallback() {
  return (
    <div className={styles.error}>
      <p className={styles.p}>Упс, кажется что-то пошло не так</p>
      <p>
        Попробуйте{' '}
        <span
          className={styles.reload}
          onClick={() => window.location.reload()}
        >
          перезагрузить
        </span>{' '}
        страницу!
      </p>
    </div>
  );
}

type WrapperProps = {
  children: React.ReactChild;
};

const Wrapper: React.FC<WrapperProps> = (props) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <div className={styles.content}>{props.children}</div>
  </ErrorBoundary>
);

export default Wrapper;
