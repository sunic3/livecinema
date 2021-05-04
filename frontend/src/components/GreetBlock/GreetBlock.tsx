import React from 'react';

import styles from './GreetBlock.module.scss';

const GreetBlock: React.FC = () => (
  <div className={styles.container}>
    <img className={styles.friends_img} src='/friends.png' />
    <h1 className={styles.title}>
      Добро пожаловать на LIVECINEMA - сервис, на котором вы можете:
    </h1>
    <ul className={styles.list}>
      <li className={styles.list_item}>Сравнить цены на любимые фильмы</li>
      <li className={styles.list_item}>Оставить свой обзор на фильм</li>
      <li className={styles.list_item}>Найти друзей по интересам</li>
    </ul>
  </div>
);

export default GreetBlock;
