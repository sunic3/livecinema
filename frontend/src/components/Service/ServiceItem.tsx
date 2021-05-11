import React from 'react';

import styles from './ServiceList.module.scss';

import { ServiceType } from '../../interfaces';

type ServiceProps = {
  service: ServiceType;
};

const ServiceItem: React.FC<ServiceProps> = ({
  service: {
    money,
    service: { logo, name },
    type,
    link,
  },
}) => {
  let price: string;
  switch (type) {
    case 1:
      price = `от ${money} руб.`;
      break;
    case 0:
      price = 'Бесплатно';
      break;
    default:
      price = 'По подписке';
  }

  return (
    <div className={styles.service}>
      <div className={styles.name}>
        <img className={styles.icon} src={`${logo}`} alt={name} />
        {name}
      </div>
      <div className={styles.price}>{price}</div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,jsx-a11y/anchor-has-content */}
      <a rel="noreferrer" className={styles.link} href={link} target="_blank" />
    </div>
  );
};

export default ServiceItem;
