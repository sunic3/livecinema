import React from 'react';

import ScrollMenu from 'react-horizontal-scrolling-menu';

import '../../../helpers/ScrollMenu.scss';

import { ActorType } from '../../../interfaces';
import ActorItem from '../ActorItem/ActorItem';
import { ArrowLeft, ArrowRight } from '../../arrows';


type ActorListProps = {
  data: ActorType[]
}

const ActorList: React.FC<ActorListProps> = ({ data }) => (
    <ScrollMenu
      data={
        data.map(a => <ActorItem actor={a} key={a.id} />)
      }
      wheel={false}
      alignCenter={false}
      arrowLeft={ArrowLeft}
      arrowRight={ArrowRight}
      // onSelect={onSelect}
      hideArrows={true}
      hideSingleArrow={true}
      menuClass='menu menu_actors'
    />
  );

export default ActorList;

// const history = useHistory();

// const onSelect = (key: string | number | null) => {
//   if (!key) {
//     return;
//   }
//
//   const id = typeof key === 'string' ? Number.parseInt(key, 10) : key;
//   const actor = data.find(d => d.id === id);

// if (actor && actor.slug) {
//   history.push(actor.slug);
// }
// };
