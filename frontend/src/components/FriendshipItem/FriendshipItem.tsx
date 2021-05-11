import React, { useState } from 'react';
import cn from 'classnames';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import styles from './FriendshipItem.module.scss';

import { getAvatar, getUsername } from '../../helpers/getInfo';

import { authFetch } from '../../helpers/authHelper';
import { changeFriendShipReq } from '../../services/requestMock';

import { User } from '../../interfaces';

type FriendShipItemProps = {
  user: User;
  updateFeeds: () => void;
};

const FriendshipItem: React.FC<FriendShipItemProps> = ({
  user: { id, first_name, username, photo },
  updateFeeds,
}) => {
  const [hidden, setHidden] = useState(false);

  const onAccept = () => {
    authFetch()
      .then((token) => changeFriendShipReq(token, id, 1))
      .then((data) => {
        setHidden(true);
        data.status === 'OK' && updateFeeds();
      })
      .catch((err) => {});
  };

  const onCancel = () => {
    authFetch()
      .then((token) => changeFriendShipReq(token, id, 2))
      .then(() => {
        setHidden(true);
      })
      .catch((err) => {});
  };

  return (
    <div className={cn(styles.item, hidden && styles.item__hide)}>
      <img className={styles.avatar} src={getAvatar(photo)} alt="Аватар" />
      <p className={styles.text}>
        <span className={styles.name}>{getUsername(first_name, username)}</span>
        <span>хочет добавить Вас в друзья</span>
      </p>
      <div className={styles.buttons}>
        <div className={cn(styles.buttons_item, styles.buttons_item__accept)}>
          <CheckIcon className={styles.icon} onClick={onAccept} />
        </div>
        <div className={cn(styles.buttons_item, styles.buttons_item__cancel)}>
          <CloseIcon className={styles.icon} onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};

export default FriendshipItem;
