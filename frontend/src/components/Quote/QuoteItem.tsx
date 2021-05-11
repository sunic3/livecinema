import React from 'react';
import cn from 'classnames';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';

import styles from './Quote.module.scss';
import { Quote } from '../../interfaces';
import Avatar from '../Avatar/Avatar';

type QuoteItemProps = {
  quote: Quote;
};

const QuoteItem: React.FC<QuoteItemProps> = ({
  quote: { author, hero, content, type, permissions },
}) => (
  <div className={styles.quote}>
    <div className={styles.header}>
      {type === 'self' ? (
        <>
          <span className={cn(styles.author, styles.self)}>Вы</span>{' '}
          <span>добавили киноцитату</span>
          {permissions === 2 ? (
            <LockOutlinedIcon className={styles.icon} />
          ) : permissions === 1 ? (
            <LockOpenOutlinedIcon className={styles.icon} />
          ) : null}
        </>
      ) : (
        <>
          <Avatar
            src={author.photo}
            mode="small"
            className={styles.header_avatar}
          />
          <span
            className={cn(
              styles.author,
              type === 'friend' ? styles.friend : null
            )}
          >
            {author.first_name || author.username.split('@')[0]}
          </span>
          <span>добавил(а) киноцитату</span>
          {permissions === 2 ? (
            <LockOutlinedIcon className={styles.icon} />
          ) : permissions === 1 ? (
            <LockOpenOutlinedIcon className={styles.icon} />
          ) : null}
        </>
      )}
    </div>
    <div className={styles.content}>
      <div className={styles.body}>{content}</div>
      {hero && <div className={styles.hero}>{hero}</div>}
    </div>
  </div>
);

export default QuoteItem;
