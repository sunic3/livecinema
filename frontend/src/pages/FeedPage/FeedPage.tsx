import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { FormControlLabel, Checkbox } from '@material-ui/core';

import styles from './FeedPage.module.scss';

import { authFetch, useAuth } from '../../helpers/authHelper';

import Friendship from '../../components/Friendship/Friendship';
import FeedItem from '../../components/FeedItem/FeedItem';

import Loader from '../../components/Loader/Loader';
import MobileMenuScroll from '../../components/MobileMenuScroll/MobileMenuScroll';

import { openAuthForm } from '../../redux/auth/actions';
import { feedsReq } from '../../services/requestMock';

import { FeedType } from '../../interfaces';
import { feedChange } from '../../redux/feed/actions';

const FeedPage: React.FC = () => {
  const [logged] = useAuth();
  const dispatch = useDispatch();

  const [feeds, setFeeds] = useState<FeedType[]>([]);
  const [loading, setLoading] = useState(true);

  const [checkViews, setCheckViews] = useState(true);
  const [checkMarks, setCheckMarks] = useState(true);
  const [checkQuotes, setCheckQuotes] = useState(true);
  const [checkReviews, setCheckReviews] = useState(true);

  const onClick = () => {
    dispatch(openAuthForm());
  };

  const updateFeeds = () => {
    authFetch()
      .then((token) => feedsReq(token))
      .then((data) => setFeeds(data))
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(feedChange(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    updateFeeds();
  }, [logged]);

  if (loading) return <Loader />;

  if (!logged)
    return (
      <div className={styles.text}>
        Здесь будут появляться обновления от ваших друзей (просмотры, оценки и
        т.д.)
        <br />
        <span className={styles.text_span} onClick={onClick}>
          Авторизуйтесь
        </span>{' '}
        и ищите друзей на страницах фильмов
      </div>
    );

  return (
    <>
      <div className={styles.friendship}>
        <Friendship updateFeeds={updateFeeds} />
      </div>
      {feeds.length === 0 ? (
        <div className={styles.text}>
          Ищите друзей на страницах фильмов и следите за их обновлениями
        </div>
      ) : (
        <>
          <div className={styles.mobile}>
            <MobileMenuScroll
              data={[
                {
                  id: 0,
                  children: (
                    <div
                      className={cn(
                        styles.mobile_item,
                        checkViews && styles.mobile_item__active
                      )}
                    >
                      Просмотры
                    </div>
                  ),
                  onClick: () => setCheckViews((p) => !p),
                },
                {
                  id: 1,
                  children: (
                    <div
                      className={cn(
                        styles.mobile_item,
                        checkMarks && styles.mobile_item__active
                      )}
                    >
                      Оценки
                    </div>
                  ),
                  onClick: () => setCheckMarks((p) => !p),
                },
                {
                  id: 2,
                  children: (
                    <div
                      className={cn(
                        styles.mobile_item,
                        checkQuotes && styles.mobile_item__active
                      )}
                    >
                      Киноцитаты
                    </div>
                  ),
                  onClick: () => setCheckQuotes((p) => !p),
                },
                {
                  id: 3,
                  children: (
                    <div
                      className={cn(
                        styles.mobile_item,
                        checkReviews && styles.mobile_item__active
                      )}
                    >
                      Обзоры
                    </div>
                  ),
                  onClick: () => setCheckReviews((p) => !p),
                },
              ]}
              margin={20}
            />
          </div>
          <div className={styles.feeds}>
            <div className={styles.feeds_filter}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkViews}
                    onChange={(event) => setCheckViews(event.target.checked)}
                    color="primary"
                    classes={{ colorPrimary: styles.check }}
                  />
                }
                classes={{ label: styles.feeds_filter_label }}
                label="Просмотры"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkMarks}
                    onChange={(event) => setCheckMarks(event.target.checked)}
                    color="primary"
                    classes={{ colorPrimary: styles.check }}
                  />
                }
                classes={{ label: styles.feeds_filter_label }}
                label="Оценки"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkQuotes}
                    onChange={(event) => setCheckQuotes(event.target.checked)}
                    color="primary"
                    classes={{ colorPrimary: styles.check }}
                  />
                }
                classes={{ label: styles.feeds_filter_label }}
                label="Киноцитаты"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkReviews}
                    onChange={(event) => setCheckReviews(event.target.checked)}
                    color="primary"
                    classes={{ colorPrimary: styles.check }}
                  />
                }
                classes={{ label: styles.feeds_filter_label }}
                label="Обзоры"
              />
            </div>
            <div className={styles.feeds_items}>
              {feeds
                .filter(
                  (feed) =>
                    (feed.type === 'view' && checkViews) ||
                    (feed.type === 'mark' && checkMarks) ||
                    (feed.type === 'quote' && checkQuotes) ||
                    (feed.type === 'review' && checkReviews)
                )
                .map((feed) => (
                  <FeedItem feed={feed} key={`${feed.type}-${feed.data.id}`} />
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeedPage;
