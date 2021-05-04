import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from 'react-toggle';

import { AppState } from '../../../redux/store';

import styles from '../Header.module.scss';
import { ThemeType } from '../../../interfaces';
import { themeChange } from '../../../redux/theme/actions';

const ThemeButton: React.FC = () => {
  const theme = useSelector<AppState, ThemeType>((state) => state.theme);
  const dispatch = useDispatch();

  const onChange = () => {
    dispatch(themeChange);
  };

  return (
    <Toggle
      defaultChecked={theme === 'dark'}
      className={styles.themeChangeButton}
      icons={{
        checked: <span className={styles.themeChangeButton__icon}>🌜</span>,
        unchecked: <span className={styles.themeChangeButton__icon}>🌞</span>,
      }}
      onChange={onChange}
    />
  );
};

export default ThemeButton;
