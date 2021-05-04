import React from 'react';
import { ServiceType } from '../../interfaces';

import styles from './ServiceList.module.scss'
import ServiceItem from './ServiceItem';

type ServiceListProps = {
  data: ServiceType[]
}

const ServiceList: React.FC<ServiceListProps> = ({ data }) => (
  <div className={styles.services}>
    {
      data.map(s => <ServiceItem service={s} key={s.id} />)
    }
  </div>
);

export default ServiceList;
