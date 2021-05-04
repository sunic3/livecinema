import React from 'react';
import cn from 'classnames';

import styles from './Footer.module.scss';

type FooterIconProps = {
  disabled?: boolean;
  link?: string;
  children: React.ReactChild;
};

const FooterIcon: React.FC<FooterIconProps> = ({
  disabled = false,
  link,
  children,
}) => (
  <div className={cn(styles.iconWrap, disabled && styles.iconWrap__disabled)}>
    {children}
    {!disabled && link && (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
        aria-label="icon"
      />
    )}
  </div>
);

export default FooterIcon;
