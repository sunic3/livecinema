import React from 'react';
import cn from 'classnames';

import ReactMarkdown from 'react-markdown';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import StarRoundedIcon from '@material-ui/icons/StarRounded';

import styles from './review.module.scss';

import Avatar from '../Avatar/Avatar';

import { Review } from '../../interfaces';

const ReviewItem: React.FC<Review> = ({
  title,
  author: { username, first_name, photo },
  date,
  content,
  rating,
  type,
  permissions,
}) => (
  <div className={styles.review}>
    <div
      className={cn(
        styles.header,
        type === 'self' ? styles.self : type === 'friend' ? styles.friend : null
      )}
    >
      <div className={styles.left}>
        <Avatar src={photo} className={styles.avatar} />
        <div className={styles.text}>
          <div className={styles.name}>
            {first_name || username.split('@')[0]}
          </div>
          <div className={styles.date}>{date}</div>
        </div>
      </div>
      <div className={styles.right}>
        {rating && (
          <>
            <div className={styles.mark}>{rating}</div>
            <StarRoundedIcon className={styles.star} />
          </>
        )}
        {permissions === 2 ? (
          <LockOutlinedIcon className={styles.icon} />
        ) : permissions === 1 ? (
          <LockOpenOutlinedIcon className={styles.icon} />
        ) : null}
      </div>
    </div>
    <h1 className={styles.title}>{title}</h1>
    <ReactMarkdown className={styles.markdown}>{content}</ReactMarkdown>
  </div>
);

export default ReviewItem;
