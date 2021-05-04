import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { useDispatch } from 'react-redux';
import { useAuth } from '../helpers/authHelper';
import { openAuthForm } from '../redux/auth/actions';

type AuthModalProps = {
  onClose: () => void;
  form: React.ReactElement;
};

const AuthModal: React.FC<AuthModalProps> = ({ onClose, form }) => {
  const [logged] = useAuth();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && !logged) {
      (async () => {
        await new Promise((resolve) => {
          dispatch(openAuthForm(resolve));
        });
        setOpen(false);
      })();
    } else if (!open && !logged) {
      onClose();
    }
  }, [logged, open]);

  if (!logged) {
    return null;
  }

  return (
    <Modal open={true} onClose={() => onClose()}>
      <div>{form}</div>
    </Modal>
  );
};

export default AuthModal;
