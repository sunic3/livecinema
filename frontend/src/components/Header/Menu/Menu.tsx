import React from 'react';

import cn from 'classnames';
import styles from './Menu.module.scss';

import MenuItem from './MenuItem';
import { NavType } from '../../../interfaces';

type MenuProps = {
  navLinks: NavType[];
  show: boolean;
  onClose: () => void;
};

const Menu: React.FC<MenuProps> = ({ navLinks, show, onClose }) => (
  <div className={show ? cn(styles.menu, styles.show) : styles.menu}>
    {navLinks.map((nav) => (
      <MenuItem {...nav} key={nav.id} onClick={onClose} />
    ))}
  </div>
);

export default Menu;
