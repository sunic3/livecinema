import React, { useState } from 'react';

import MenuIcon from '@material-ui/icons/Menu';
import { SvgIcon } from '@material-ui/core';
import Menu from './Menu';

type MenuButtonProps = {}

const MenuButton: React.FC<MenuButtonProps> = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <SvgIcon>
        <MenuIcon />
      </SvgIcon>
      {
        show ?
          <Menu /> :
          null
      }
    </>
  );
};

export default MenuButton;
