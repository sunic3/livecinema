import React, { useEffect, useState } from 'react';

import styles from './Watcher.module.scss';

import Loader from '../Loader/Loader';
import WatcherItem from './WatcherItem';

import { authFetch, useAuth } from '../../helpers/authHelper';
import { getWatchersReq } from '../../services/requestMock';

import { Watcher } from '../../interfaces';

type WatcherItemsProps = {
  slug: string;
};

const WatcherItems: React.FC<WatcherItemsProps> = ({ slug }) => {
  const [logged] = useAuth();
  const [watchers, setWatchers] = useState<Watcher[] | null>(null);

  useEffect(() => {
    authFetch()
      .then(
        (token) => getWatchersReq(slug, token),
        (err) => (err.message === 'no token' ? getWatchersReq(slug) : err)
      )
      .then((data) => setWatchers(data))
      .catch((err) => {});
  }, [slug, logged]);

  const addFriend = (watcher: Watcher) => {
    setWatchers((prevState) =>
      [
        ...(prevState?.filter(
          (w) => w.user.username !== watcher.user.username
        ) || []),
        { ...watcher, status: 1 },
      ].sort((a, b) => b.status - a.status)
    );
  };

  if (!watchers) return <Loader />;

  if (!watchers.length)
    return (
      <span className={styles.no_watchers}>
        Пока никто не добавил этот фильм в список "Просмотренные".
      </span>
    );

  if (watchers.length === 1 && watchers[0].status === -1)
    return (
      <span className={styles.no_watchers}>
        Пока никто кроме Вас не добавил этот фильм в список "Просмотренные".
      </span>
    );

  return (
    <>
      {watchers
        .filter((w) => w.status >= 0)
        .map((w) => (
          <WatcherItem watcher={w} addFriend={addFriend} key={w.id} />
        ))}
    </>
  );
};

export default WatcherItems;
