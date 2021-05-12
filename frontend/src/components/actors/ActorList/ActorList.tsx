import React, { useEffect, useRef } from 'react';

import ScrollMenu from 'react-horizontal-scrolling-menu';

import '../../../helpers/ScrollMenu.scss';

import ActorItem from '../ActorItem/ActorItem';
import { ArrowLeft, ArrowRight } from '../../arrows';

import { ActorType } from '../../../interfaces';

type ActorListProps = {
  data: ActorType[];
  movieSlug: string;
};

const ActorList: React.FC<ActorListProps> = ({ data, movieSlug }) => {
  const menuRef = useRef<ScrollMenu>(null);
  useEffect(() => {
    menuRef.current?.scrollTo('0');
  }, [movieSlug])

  return (
    <ScrollMenu
      data={data.map((a) => (
        <ActorItem actor={a} key={a.id} />
      ))}
      wheel={false}
      alignCenter={false}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      hideArrows={true}
      hideSingleArrow={true}
      menuClass="menu menu_actors"
      ref={menuRef}
    />
  );
}

export default ActorList;
