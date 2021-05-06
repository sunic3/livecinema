import React from 'react';
import { useSelector } from 'react-redux';

import LiveTvIcon from '@material-ui/icons/LiveTv';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import styles from './BottomMenu.module.scss';
import BottomMenuItem from '../BottomMenuItem/BottomMenuItem';
import { AppState } from '../../redux/store';

const BottomMenu: React.FC = () => {
  const feeds = useSelector<AppState, number>((state) => state.feed);

  return (
    <div className={styles.menu}>
      <BottomMenuItem href="/" exact icon={<LiveTvIcon />} title="Фильмы" />
      <BottomMenuItem
        href="/lenta"
        exact
        notes={feeds > 0}
        icon={
          <svg
            className={styles.icon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M 0 0 L 0 20 C 0 22.199219 1.800781 24 4 24 L 20 24 C 22.199219 24 24 22.199219 24 20 L 24 4 L 18 4 L 18 0 Z M 2 2 L 16 2 L 16 20 C 16 20.742188 16.265625 21.402344 16.625 22 L 4 22 C 2.882813 22 2 21.117188 2 20 Z M 4 4 L 4 7 L 14 7 L 14 4 Z M 18 6 L 22 6 L 22 20 C 22 21.117188 21.117188 22 20 22 C 18.882813 22 18 21.117188 18 20 L 18 19 L 20 19 L 20 17 L 18 17 L 18 16 L 20 16 L 20 14 L 18 14 L 18 13 L 20 13 L 20 11 L 18 11 L 18 10 L 20 10 L 20 8 L 18 8 Z M 4 9 L 4 11 L 8 11 L 8 9 Z M 10 9 L 10 11 L 14 11 L 14 9 Z M 4 12 L 4 14 L 8 14 L 8 12 Z M 10 12 L 10 14 L 14 14 L 14 12 Z M 4 15 L 4 17 L 8 17 L 8 15 Z M 10 15 L 10 17 L 14 17 L 14 15 Z M 4 18 L 4 20 L 8 20 L 8 18 Z M 10 18 L 10 20 L 14 20 L 14 18 Z" />
          </svg>
        }
        title="Лента"
      />
      <BottomMenuItem
        href="/genres"
        icon={<InsertEmoticonIcon />}
        title="Жанры"
      />
    </div>
  );
}

export default BottomMenu;
