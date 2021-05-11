import React from 'react';
import cn from 'classnames';

import styles from './Avatar.module.scss';

import { getAvatar } from '../../helpers/getInfo';

type AvatarProps = {
  src: string | null;
  mode?: 'large' | 'small';
  className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, mode, className }) => (
  <img
    className={cn(
      styles.avatar,
      mode === 'large' && styles.avatar__large,
      mode === 'small' && styles.avatar__small,
      className
    )}
    src={getAvatar(src)}
    alt="Аватар"
  />
);

export default Avatar;
