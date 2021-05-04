import React from 'react';
import { ServiceType } from '../../interfaces';

import styles from './ServiceList.module.scss';

type ServiceProps = {
  service: ServiceType
}

const Service: React.FC<ServiceProps> = ({ service }) => (
  <div className={styles.service}>

  </div>
);

export default Service;
