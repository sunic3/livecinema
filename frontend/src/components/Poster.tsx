import React from 'react';

type PosterProps = {
  poster: string | null,
}

const Poster: React.FC<PosterProps> = ({ poster }) => (
  <img style={{ width: '100%', borderRadius: '10px' }} src={poster || '/movie_default.png'} alt='Постер' />
);

export default Poster;
