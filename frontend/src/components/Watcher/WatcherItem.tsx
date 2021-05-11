import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import styles from './Watcher.module.scss';

import Avatar from '../Avatar/Avatar';
import BigButton from '../buttons/BigButton';
import AuthModal from '../AuthModal';
import AddFriend from './AddFriend';

import { plural } from '../../helpers/plural';

import { Watcher } from '../../interfaces';

type WatcherItemProps = {
  watcher: Watcher;
  addFriend: (watcher: Watcher) => void;
};

const WatcherItem: React.FC<WatcherItemProps> = ({ watcher, addFriend }) => {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const onOpen = () => {
    setShowAddFriend(true);
  };

  const onClose = () => {
    setShowAddFriend(false);
  };

  return (
    <>
      <div className={styles.watcher}>
        <div className={styles.user}>
          <Avatar src={watcher.user.photo} />
          <div className={styles.user_info}>
            <div className={styles.name}>
              {watcher.user.first_name || watcher.user.username.split('@')[0]}
            </div>
            <div className={styles.movies}>
              {`Просмотрел(а) ${watcher.movies.all} фильм${plural(
                watcher.movies.all,
                []
              )}`}
              {watcher.movies.match !== 0 && ` (${watcher.movies.match} совп.)`}
            </div>
            {watcher.rating ? (
              <div className={styles.rating}>
                {watcher.rating}
                <StarRoundedIcon className={styles.star} />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.addButton}>
          {!watcher.status && (
            <BigButton type="submit" onClick={onOpen}>
              <>
                <AddIcon />В друзья
              </>
            </BigButton>
          )}
        </div>
      </div>
      {showAddFriend && (
        <AuthModal
          onClose={onClose}
          form={
            <AddFriend onAdd={addFriend} onClose={onClose} watcher={watcher} />
          }
        />
      )}
    </>
  );
};

export default WatcherItem;
