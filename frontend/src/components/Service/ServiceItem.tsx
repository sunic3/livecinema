import React from 'react';
import { ServiceType } from '../../interfaces';

import styles from './ServiceList.module.scss';

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
      <div className={styles.service__name}>
        <img src={`${logo}`} alt={name} />
        {name}
      </div>
      <div className={styles.service__price}>{price}</div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,jsx-a11y/anchor-has-content */}
      <a
        rel="noreferrer"
        className={styles.service__link}
        href={link}
        target="_blank"
      />
    </div>
  );
};

export default ServiceItem;
