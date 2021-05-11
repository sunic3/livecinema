import React, { useRef } from 'react';

import styles from './MobileMenuScroll.module.scss';

type MobileMenuScrollProps = {
  data: {
    id: number;
    children: React.ReactElement;
    onClick?: () => void;
  }[];
  margin: number;
};

const MobileMenuScroll: React.FC<MobileMenuScrollProps> = ({
  data,
  margin,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const onClick = (index: number, callback?: () => void) => {
    if (divRef.current) {
      const maxWidth = divRef.current.scrollWidth;
      const curWidth = divRef.current.offsetWidth;
      let elWidth;
      let otherWidth = 0;
      divRef.current.childNodes.forEach((el, i) => {
        if (el instanceof HTMLElement) {
          if (i === index) {
            elWidth = el.offsetWidth;
          }
          if (i > index) {
            otherWidth += el.offsetWidth + margin;
          }
        }
      });
      elWidth &&
        divRef.current.scroll(
          maxWidth - otherWidth - elWidth / 2 - curWidth / 2,
          0
        );
    }
    callback && callback();
  };

  return (
    <div className={styles.menu} ref={divRef}>
      {data.map((item, index) =>
        React.cloneElement(item.children, {
          onClick: () => onClick(index, item.onClick),
        })
      )}
    </div>
  );
};

export default MobileMenuScroll;
