import React from 'react';
import Modal from '@material-ui/core/Modal';

import styles from './Trailer.module.scss';

type TrailerProps = {
  src: string;
  onClose: () => void;
};

const Trailer: React.FC<TrailerProps> = ({ src, onClose }) => (
  <Modal open={true} onClose={onClose}>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <video className={styles.video} src={src} controls autoPlay />
  </Modal>
);

export default Trailer;
