import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './BottomMenuItem.module.scss';

type BottomMenuItemProps = {
  href: string;
  exact?: boolean;
  icon: React.ReactElement;
  title: string;
};

const BottomMenuItem: React.FC<BottomMenuItemProps> = ({
  href,
  exact = false,
  icon,
  title,
}) => (
  <NavLink
    to={href}
    exact={exact}
    className={styles.itemBlock}
    activeClassName={styles.itemBlock__active}
  >
    <div className={styles.item}>
      {React.cloneElement(icon, { className: styles.icon })}
      <h6 className={styles.text}>{title}</h6>
    </div>
  </NavLink>
);

export default BottomMenuItem;
