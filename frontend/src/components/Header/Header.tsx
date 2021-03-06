import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';

import Logo from '../Logo/Logo';
import Search from '../Search/Search';
import ThemeButton from './ThemeButton';
import ProfileButton from './ProfileButton';
import BottomMenu from '../BottomMenu/BottomMenu';

import { AppState } from '../../redux/store';

import { NavType } from '../../interfaces';

const NAV_LINKS: NavType[] = [
  {
    id: 1,
    title: 'Что посмотреть',
    href: '/',
    exact: true,
  },
  {
    id: 2,
    title: 'Лента',
    href: '/feed',
  },
  {
    id: 3,
    title: 'Жанры',
    href: '/genres',
  },
];

const Header: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [search, setSearch] = useState(false);

  const feeds = useSelector<AppState, number>((state) => state.feed);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        {width > 540 && (
          <div className={styles.links}>
            {NAV_LINKS.map((nav) => (
              <NavLink
                to={nav.href}
                className={styles.link}
                activeClassName={styles.link_active}
                exact={nav.exact}
                key={nav.id}
              >
                {nav.title}
                {nav.title === 'Лента' && feeds > 0 && (
                  <span className={styles.feed_span}>•</span>
                )}
              </NavLink>
            ))}
          </div>
        )}
        {!search && <Logo />}
        <div
          className={cn(
            styles.icons,
            search ? styles.icons_search : null
          )}
        >
          <Search search={search} setSearch={setSearch} />
          <ThemeButton />
          <ProfileButton />
        </div>
      </div>
      {width <= 540 && <BottomMenu />}
    </div>
  );
};

export default Header;
