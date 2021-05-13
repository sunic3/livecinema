import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import StarRoundedIcon from '@material-ui/icons/StarRounded';

import styles from './FeedItem.module.scss';

import Avatar from '../Avatar/Avatar';

import { getUsername } from '../../helpers/getInfo';

import { FeedType } from '../../interfaces';

const getText = (
  type: FeedType['type'],
  movie: FeedType['data']['movie'],
  mark?: string
) => {
  switch (type) {
    case 'view':
      return (
        <>
          добавил фильм{' '}
          <a className={styles.movie} href={`/movie/${movie.slug}`}>
            {movie.title}
          </a>{' '}
          в список "Просмотренных"
        </>
      );
    case 'mark':
      return (
        <>
          поставил фильму{' '}
          <a className={styles.movie} href={`/movie/${movie.slug}`}>
            {movie.title}
          </a>{' '}
          оценку <span className={styles.rating}>{mark}</span>
          <StarRoundedIcon className={styles.star} />
        </>
      );
    case 'quote':
      return (
        <>
          добавил к фильму{' '}
          <a className={styles.movie} href={`/movie/${movie.slug}`}>
            {movie.title}
          </a>{' '}
          новую киноцитату
        </>
      );
    case 'review':
      return (
        <>
          написал на фильм{' '}
          <a className={styles.movie} href={`/movie/${movie.slug}`}>
            {movie.title}
          </a>{' '}
          рецензию
        </>
      );
    default:
      return <></>;
  }
};

type FeedItemProps = {
  feed: FeedType;
};

const FeedItem: React.FC<FeedItemProps> = ({
  feed: {
    type,
    data: { user, movie, date },
    content,
  },
}) => {
  const [reviewShow, setReviewShow] = useState(false);

  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <Avatar src={user.photo} className={styles.avatar} />
        <p className={styles.text}>
          <span className={styles.date}>
            {new Date(Date.parse(date)).toLocaleDateString('ru-RU')}
          </span>
          <br />
          <span className={styles.name}>
            {getUsername(user.first_name, user.username)}
          </span>{' '}
          {getText(type, movie, type === 'mark' ? content : undefined)}
        </p>
      </div>
      {type === 'quote' && (
        <div className={styles.content}>
          <div className={styles.quote}>{content}</div>
        </div>
      )}
      {type === 'review' && (
        <div className={styles.content}>
          {reviewShow ? (
            <ReactMarkdown className={styles.review}>{content}</ReactMarkdown>
          ) : (
            <div
              className={styles.reviewShow}
              onClick={() => setReviewShow(true)}
            >
              Показать обзор
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedItem;
