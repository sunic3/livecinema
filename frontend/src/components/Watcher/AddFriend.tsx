import React, { useEffect } from 'react';
import { authFetch } from '../../helpers/authHelper';
import { addFriendReq } from '../../services/requestMock';
import { Watcher } from '../../interfaces';

type AddFriendProps = {
  onAdd: (watcher: Watcher) => void;
  onClose: () => void;
  watcher: Watcher;
};

const AddFriend: React.FC<AddFriendProps> = ({ onAdd, onClose, watcher }) => {
  useEffect(() => {
    authFetch()
      .then((token) => addFriendReq(watcher.user.username, token))
      .then((data) => {
        data.status === 'success' && onAdd(watcher);
        onClose();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default AddFriend;
