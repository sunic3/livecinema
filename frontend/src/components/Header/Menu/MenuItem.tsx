import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavType } from '../../../interfaces';
import styles from './Menu.module.scss';

type MenuItemProps = Omit<NavType, 'id'> & { onClick: () => void };

const MenuItem: React.FC<MenuItemProps> = ({ title, href, onClick }) => (
  <NavLink to={href} className={styles.menu__item} onClick={onClick}>
    {title}
  </NavLink>
);

export default MenuItem;
