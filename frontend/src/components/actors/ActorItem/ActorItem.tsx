import React from 'react';
import { Link } from 'react-router-dom';

import { ActorType } from '../../interfaces';

import styles from './ActorItem.module.scss'
import { BACKEND } from '../../constants';

type ActorItemProps = {
  actor: ActorType
}

const ActorItem: React.FC<ActorItemProps> = ({ actor }) => (
  <div className={styles.actor}>
    <img src={`${BACKEND}${actor.photo}`} alt='Фото' />
    <div>{actor.name}</div>
    {
      actor.slug ?
        <Link to={`/directors/${actor.slug}`} /> :
        null
    }
  </div>
);

export default ActorItem;
