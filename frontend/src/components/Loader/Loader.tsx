import React from 'react';

import styles from './Loader.module.scss';

const Loader: React.FC = () => (
    <div className={styles.loader}>
      <div className={styles.dot} />
    </div>
  );

export default Loader;
