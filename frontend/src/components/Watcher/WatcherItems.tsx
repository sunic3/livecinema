import React, { useEffect, useState } from 'react';
import { getWatchersReq } from '../../services/requestMock';
import { authFetch, useAuth } from '../../helpers/authHelper';
import { Watcher } from '../../interfaces';
import WatcherItem from './WatcherItem';

type WatcherItemsProps = {
  slug: string;
};

const WatcherItems: React.FC<WatcherItemsProps> = ({ slug }) => {
  const [logged] = useAuth();
  const [watchers, setWatchers] = useState<Watcher[]>([]);

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
        ...prevState.filter((w) => w.user.username !== watcher.user.username),
        { ...watcher, status: 1 },
      ].sort((a, b) => b.status - a.status)
    );
  };

  return (
    <>
      {watchers.map((w) => (
        <WatcherItem watcher={w} addFriend={addFriend} key={w.id} />
      ))}
    </>
  );
};

export default WatcherItems;
