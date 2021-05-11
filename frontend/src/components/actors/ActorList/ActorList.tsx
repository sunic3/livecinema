import React from 'react';

import ScrollMenu from 'react-horizontal-scrolling-menu';

import '../../../helpers/ScrollMenu.scss';

import ActorItem from '../ActorItem/ActorItem';
import { ArrowLeft, ArrowRight } from '../../arrows';

import { ActorType } from '../../../interfaces';

type ActorListProps = {
  data: ActorType[];
};

const ActorList: React.FC<ActorListProps> = ({ data }) => (
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
  />
);

export default ActorList;
