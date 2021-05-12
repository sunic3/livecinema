import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './ProfilePage.module.scss';

import Loader from '../../components/Loader/Loader';
import Input from '../../components/AuthForm/Input';
import BigButton from '../../components/buttons/BigButton';

import { useInput } from '../../helpers/formHooks';
import { authFetch, logout } from '../../helpers/authHelper';
import { getAvatar } from '../../helpers/getInfo';

import { profileReq, updateProfileReq } from '../../services/requestMock';

const ProfilePage: React.FC = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState('');

  const [username, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const {
    value: password,
    isDirty: passwordDirty,
    setIsDirty: setPasswordDirty,
    onChange: onPasswordChange,
    checkValid: passwordValid,
  } = useInput('', {
    minLength: 8,
  });
  const {
    value: password2,
    isDirty: password2Dirty,
    setIsDirty: setPassword2Dirty,
    onChange: onPassword2Change,
  } = useInput('', {});

  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    authFetch()
      .then((token) => profileReq(token))
      .then((user) => {
        user.first_name && setFirstName(user.first_name);
        user.last_name && setLastName(user.last_name);
        setUserName(user.username);
        setDefaultImage(getAvatar(user.photo));
      })
      .finally(() => setLoading(false));
  }, []);

  const onLogout = () => {
    history.push('/');
    logout();
  };

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', 'admin@admin.ru');
    if (!password && password === password2) {
      formData.append('password', password);
      formData.append('password2', password2);
    }
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    file && formData.append('photo', file);

    authFetch()
      .then((token) => updateProfileReq(token, formData))
      .then((data) => console.log(data))
      .finally(() => setIsDirty(false));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files && setFile(event.target.files[0]);
    setIsDirty(true);
  };

  const imageInput = () => {
    fileRef.current?.click();
  };

  const imageReset = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
      setFile(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.logout}>
        <span onClick={onLogout} className={styles.logout_span}>
          Выйти
        </span>
      </div>
      <form
        className={styles.form}
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
      >
        <div className={styles.left}>
          <img
            className={styles.avatar}
            src={(file && URL.createObjectURL(file)) || defaultImage}
            alt="Аватар"
          />
          <input
            type="file"
            id="fileInput"
            onChange={onImageChange}
            style={{ display: 'none' }}
            ref={fileRef}
          />
          <BigButton onClick={imageInput} className={styles.fileInput}>
            Выберите файл
          </BigButton>
          <BigButton
            type="cancel"
            onClick={imageReset}
            className={styles.fileInput}
          >
            Отмена
          </BigButton>
        </div>
        <div className={styles.right}>
          <Input
            name="username"
            value={username}
            onChange={() => {}}
            disabled
          />
          <Input
            name="first_name"
            value={firstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFirstName(event.target.value);
              setIsDirty(true);
            }}
            placeholder="Имя"
          />
          <Input
            name="last_name"
            value={lastName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(event.target.value);
              setIsDirty(true);
            }}
            placeholder="Фамилия"
          />
          <Input
            inputType="password"
            name="password"
            value={password}
            onChange={(event) => {
              onPasswordChange(event);
              !event.target.value && setPasswordDirty(false);
              !password2 && password2Dirty && setPassword2Dirty(false);
              setIsDirty(true);
            }}
            isDirty={passwordDirty}
            valid={passwordValid()}
            placeholder="Пароль"
            errorText="Короткий пароль"
          />
          <Input
            inputType="password"
            name="password2"
            value={password2}
            onChange={(event) => {
              onPassword2Change(event);
              !event.target.value &&
                !password &&
                password2Dirty &&
                setPassword2Dirty(false);
              setIsDirty(true);
            }}
            isDirty={password2Dirty}
            valid={password !== password2}
            placeholder="Повторите пароль"
            errorText="Пароли не совпадают"
          />
          <BigButton
            type="submit"
            disabled={!isDirty || (!!password && password !== password2)}
          >
            {isDirty ? 'Сохранить' : 'Сохранено'}
          </BigButton>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
