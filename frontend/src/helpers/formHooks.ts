import React, { useEffect, useState } from 'react';

const isEmpty = 'isEmpty';
const minLength = 'minLength';
const emailMatch = 'emailMatch';
const clearUncorrect = 'clearUncorrect';

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type ValidationType = {
  [isEmpty]?: boolean;
  [minLength]?: number;
  [emailMatch]?: boolean;
  [clearUncorrect]?: boolean;
};

export const useInput = (initialValue: string, validations: ValidationType) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsDirty(true)
  };

  const onError = () => {
    setValue('')
  }

  const checkValid = () => Object.values(valid).some((x) => x);

  return {
    value,
    isDirty,
    setIsDirty,
    onChange,
    onError,
    checkValid,
  };
};

export const useValidation = (value: string, validations: ValidationType) => {
  const [isEmptyError, setEmptyError] = useState(false);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailMatchError, setEmailMatchError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case minLength:
          validations.minLength &&
            setMinLengthError(value.length < validations.minLength);
          break;
        case isEmpty:
          validations.isEmpty && setEmptyError(!value);
          break;
        case emailMatch:
          validations.emailMatch &&
            setEmailMatchError(!re.test(value.toLowerCase()));
          break;
      }
    }
  }, [value]);

  return {
    isEmptyError,
    minLengthError,
    emailMatchError,
  };
};
