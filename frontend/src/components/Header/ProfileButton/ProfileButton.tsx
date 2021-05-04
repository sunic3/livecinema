import React  from 'react';
import { useHistory } from 'react-router-dom';

import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import { useDispatch } from 'react-redux';
import { logout, useAuth } from '../../../helpers/authHelper';

import styles from '../Header.module.scss';
import { openAuthForm } from '../../../redux/auth/actions';

const ProfileButton: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const [logged] = useAuth();

  const moveToProfile = () => {
    logout()
    // history.push('/profile');
  };

  const openForm = () => {
    dispatch(openAuthForm())
  };

  return (
    <>
      {logged ? (
        <PersonOutlineOutlinedIcon
          onClick={moveToProfile}
          className={styles.profileButton__active}
        />
      ) : (
        <PersonOutlineOutlinedIcon
          onClick={openForm}
          className={styles.icon}
        />
      )}
    </>
  );
};

export default ProfileButton;
