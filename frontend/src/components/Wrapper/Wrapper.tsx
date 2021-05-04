import React from 'react';

import styles from './Wrapper.module.scss'

type WrapperProps = {
  children: React.ReactChild,
}

const Wrapper: React.FC<WrapperProps> = (props) => (
  <div className={styles.content}>
    {props.children}
  </div>
);

export default Wrapper;
