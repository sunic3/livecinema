import React, { useEffect } from 'react';

import { authFetch } from '../../helpers/authHelper';

import { addWatcherReq } from '../../services/requestMock';

type WatcherFormProps = {
  onAdd: () => void;
  onClose: () => void;
  movieSlug: string;
};

const WatcherForm: React.FC<WatcherFormProps> = ({
  onAdd,
  onClose,
  movieSlug,
}) => {
  useEffect(() => {
    authFetch()
      .then((token) => addWatcherReq(token, movieSlug))
      .then((data) => {
        data.status === 'OK' && onAdd();
        onClose();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default WatcherForm;
