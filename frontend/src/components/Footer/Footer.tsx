import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';

import styles from './Footer.module.scss';

import FooterIcon from './FooterIcon';

const Footer: React.FC = () => (
  <div className={styles.footer}>
    <div className={styles.icons}>
      <FooterIcon disabled>
        <FacebookIcon className={styles.icon} />
      </FooterIcon>
      <FooterIcon disabled>
        <TwitterIcon className={styles.icon} />
      </FooterIcon>
      <FooterIcon link="https://t.me/sunichek">
        <TelegramIcon className={styles.icon} />
      </FooterIcon>
      <FooterIcon link="https://gitlab.com/gitSunic/livecinema">
        <GitHubIcon className={styles.icon} />
      </FooterIcon>
    </div>
    <div className={styles.footer_text}>© 2021 LiveCinema</div>
  </div>
);

export default Footer;
