import React from 'react';

const Arrow: (
  text: React.ReactChild,
  className: string
) => React.ReactElement = (text, className) => (
  <div className={className}>{text}</div>
);

export const ArrowLeft = Arrow(
  <svg
    width="12"
    height="37"
    viewBox="0 0 12 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.68457 19.2591L11.5 1.5" stroke="#848282" />
    <path d="M11.5 36.2591L0.68457 18.5" stroke="#848282" />
  </svg>,

  'arrow-prev'
);
export const ArrowRight = Arrow(
  <svg
    width="12"
    height="37"
    viewBox="0 0 12 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.5 19.2591L0.68457 1.5" stroke="#848282" />
    <path d="M0.68457 36.2591L11.5 18.5" stroke="#848282" />
  </svg>,

  'arrow-next'
);
