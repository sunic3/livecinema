import React, { useState } from 'react';
import cn from 'classnames';

import styles from './RollText.module.scss';

type RollTextProps = {
  text: string | React.ReactChild;
};

const RollText: React.FC<RollTextProps> = ({ text }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className={cn(styles.text, show ? styles.show : null)}>{text}</div>
      <div
        className={styles.btn}
        onClick={() => setShow((p) => !p)}
        role="presentation"
      >
        {show ? 'Свернуть' : 'Развернуть'}
      </div>
    </div>
  );
};

export default RollText;
