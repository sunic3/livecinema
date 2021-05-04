import React from 'react';

type LogoProps = {}

const Logo: React.FC<LogoProps> = () => (
  <div>
    <img src='/logo.svg' alt='logo' />
  </div>
);

export default Logo;
