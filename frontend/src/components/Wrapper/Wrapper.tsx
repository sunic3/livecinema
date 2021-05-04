import React from 'react';

import styles from './Content.module.scss'

type ContentProps = {
  children: React.ReactChild,
}

const Content: React.FC<ContentProps> = (props) => (
  <div className={styles.content}>
    {props.children}
  </div>
);

export default Content;
