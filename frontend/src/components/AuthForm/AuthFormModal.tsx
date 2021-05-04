import React from 'react';

import { Modal } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { closeAuthForm } from '../../redux/auth/actions';

import AuthForm from './AuthForm';
import { AuthFormType } from '../../interfaces';

type AuthFormModalProps = {};

const AuthFormModal: React.FC<AuthFormModalProps> = () => {
  const authForm = useSelector<AppState, AuthFormType>(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  return (
    <Modal open={authForm.show} onClose={() => dispatch(closeAuthForm())}>
      <div>
        <AuthForm />
      </div>
    </Modal>
  );
};

export default AuthFormModal;
