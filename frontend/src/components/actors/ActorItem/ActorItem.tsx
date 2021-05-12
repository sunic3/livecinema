import React from 'react';

import styles from './ActorItem.module.scss';

import Avatar from '../../Avatar/Avatar';

import { ActorType } from '../../../interfaces';

type ActorItemProps = {
  actor: ActorType;
};

const ActorItem: React.FC<ActorItemProps> = ({ actor }) => (
  <div className={styles.actor}>
    <Avatar src={actor.photo} mode="large" />
    <div className={styles.name}>{actor.name}</div>
    <div className={styles.select} />
  </div>
);

export default ActorItem;
