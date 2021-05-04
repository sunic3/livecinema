import React, { useState } from 'react';


import { SvgIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import menuStyles from './Menu.module.scss';
import headerStyles from '../Header.module.scss';

import Menu from './Menu';
import { NavType } from '../../../interfaces';


type MenuButtonProps = {
  navLinks: NavType[],
}

const MenuButton: React.FC<MenuButtonProps> = ({ navLinks }) => {
  const [show, setShow] = useState(false);

  const onShow = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <SvgIcon onClick={show ? onClose : onShow} className={menuStyles.button}>
        {
          show ?
            <CloseIcon className={headerStyles.icon} /> :
            <MenuIcon className={headerStyles.icon} />
        }
      </SvgIcon>
      <Menu navLinks={navLinks} show={show} onClose={onClose} />
    </>
  );
};

export default MenuButton;
