import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

type LogoProps = {};

const Logo: React.FC<LogoProps> = () => (
  <div>
    <Link to="/">
      <img src="/logo.svg" alt="logo" className={styles.logo} />
    </Link>
  </div>
);

export default Logo;
