import React from 'react';
import cn from 'classnames';

import styles from './buttons.module.scss';

import {
  BUTTON_CANCEL,
  BUTTON_REVIEW,
  BUTTON_SUBMIT,
  BUTTON_TRAILER,
} from '../../constants';

import { ButtonType } from '../../interfaces';

type BigButtonProps = {
  type?: ButtonType;
  className?: string;
  children: React.ReactChild | React.ReactChildren;
  onClick?: () => void;
  disabled?: boolean;
};

const BigButton: React.FC<BigButtonProps> = ({
  type,
  className,
  children,
  onClick,
  disabled = false,
}) => {
  let buttonStyle;

  switch (type) {
    case BUTTON_TRAILER:
      buttonStyle = styles.trailer;
      break;
    case BUTTON_REVIEW:
      buttonStyle = styles.review;
      break;
    case BUTTON_SUBMIT:
      buttonStyle = styles.submit;
      break;
    case BUTTON_CANCEL:
      buttonStyle = styles.cancel;
      break;
    default:
      buttonStyle = null;
      break;
  }

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={cn(
        styles.button,
        styles.bigButton,
        buttonStyle,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BigButton;
