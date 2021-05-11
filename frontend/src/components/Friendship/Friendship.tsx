import React, { useEffect, useState } from 'react';

import styles from './Friendship.module.scss';

import FriendshipItem from '../FriendshipItem/FriendshipItem';

import { authFetch } from '../../helpers/authHelper';
import { friendshipReq } from '../../services/requestMock';

import { User } from '../../interfaces';

type FriendShipItemsProps = {
  updateFeeds: () => void;
};

const Friendship: React.FC<FriendShipItemsProps> = ({ updateFeeds }) => {
  const [requests, setRequests] = useState<User[]>([]);
  const [, setError] = useState();

  useEffect(() => {
    authFetch()
      .then((token) => friendshipReq(token))
      .then((data) => setRequests(data))
      .catch((err) => {
        if (err.message === 'no token') {
          return;
        }
        setError(() => {
          throw err;
        });
      });
  }, []);

  if (requests.length === 0) return null;

  return (
    <div className={styles.friendship}>
      {requests.map((r) => (
        <FriendshipItem user={r} key={r.id} updateFeeds={updateFeeds} />
      ))}
    </div>
  );
};

export default Friendship;
