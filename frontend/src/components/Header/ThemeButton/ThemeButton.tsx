import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import SvgIcon from '@material-ui/core/SvgIcon';

import { Store } from '../../redux/reducer';

import styles from './ThemeButton.module.scss';
import { ThemeType } from '../../../interfaces';


const ThemeButton: React.FC = () => {
  const theme = useSelector<Store, ThemeType>((state) => state.theme);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: 'themeChange' });
  };

  return (
    <SvgIcon onClick={onClick}>
      {
        theme === 'light' ?
          <WbSunnyOutlinedIcon className={styles.icon} /> :
          <Brightness2OutlinedIcon className={styles.icon} />
      }
    </SvgIcon>
  );
};

export default ThemeButton;
