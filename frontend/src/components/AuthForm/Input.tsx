import React from 'react';
import cn from 'classnames';

import styles from './Input.module.scss';

type InputProps = {
  inputType?: string;
  id?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  isDirty?: boolean;
  valid?: boolean;
  disabled?: boolean;
  errorText?: string;
};

const Input: React.FC<InputProps> = ({
  inputType,
  id,
  name,
  placeholder,
  value,
  onChange,
  onFocus,
  isDirty = false,
  valid = false,
  disabled = false,
  errorText,
}) => (
  <>
    <input
      type={inputType || 'text'}
      id={id}
      name={name}
      value={value}
      onFocus={onFocus}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        styles.input,
        isDirty && (valid ? styles.not_valid : styles.valid)
      )}
      disabled={disabled}
    />
    {isDirty && valid && <h6 className={styles.error}>{errorText}</h6>}
  </>
);

export default Input;
