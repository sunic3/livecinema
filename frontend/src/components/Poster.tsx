import React from 'react';

type PosterProps = {
  poster: string | null,
}

const Poster: React.FC<PosterProps> = ({ poster }) => (
  <img src={poster || '/movie_default.png'} alt='Постер' />
);

export default Poster;
