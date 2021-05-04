import React from 'react';

import { ActorType } from '../../../interfaces';

import styles from './ActorItem.module.scss'

type ActorItemProps = {
  actor: ActorType
}

const ActorItem: React.FC<ActorItemProps> = ({ actor }) => (
  <div className={styles.actor}>
    <img src={actor.photo ? `${actor.photo}` : '/photo.jpg'} alt='Фото' />
    <div>{actor.name}</div>
    <div className={styles.front} />
  </div>
);

export default ActorItem;
