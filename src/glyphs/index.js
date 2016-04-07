import React, { PropTypes } from 'react';

const tabBarIconProps = {
  style: PropTypes.string,
  color: PropTypes.string,
};

export const saved = ({ style, color }) => (
  <svg className={style} width="21" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.786 0c-1.546 0-2.784.555-3.877 1.648-.003 0-.625.784-.625.784l-.62-.735C8.57.602 7.33 0 5.785 0c-1.546 0-3 .602-4.09 1.695C.6 2.787 0 4.24 0 5.785c0 1.546.6 2.997 1.693 4.09l7.68 7.744c.24.242.57.38.913.38.342 0 .67-.138.913-.38l7.677-7.745c1.092-1.093 1.693-2.545 1.693-4.09 0-1.546-.6-3-1.693-4.09C17.784.6 16.33 0 14.787 0z" fill={color} fill-rule="evenodd" />
  </svg>
);

saved.propTypes = tabBarIconProps;

export const routes = ({ style, color }) => (
  <svg className={style} width="24" height="14" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.105 2.21h21.37c.61 0 1.104-.494 1.104-1.105C23.58.495 23.082 0 22.472 0H1.103C.496 0 0 .495 0 1.105S.495 2.21 1.105 2.21zm21.37 3.685H1.105C.494 5.895 0 6.39 0 7s.495 1.105 1.105 1.105h21.37c.61 0 1.104-.495 1.104-1.105s-.497-1.105-1.107-1.105zm0 5.894H1.105c-.61 0-1.106.493-1.106 1.104C0 13.504.494 14 1.104 14h21.37c.61 0 1.104-.495 1.104-1.105s-.497-1.106-1.107-1.106z" fill={color} fill-rule="evenodd" />
  </svg>
);

routes.propTypes = tabBarIconProps;

export const nearby = ({ style, color }) => (
  <svg className={style} width="15" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0C3.358 0 0 3.358 0 7.5 0 11.642 7.5 20 7.5 20S15 11.642 15 7.5C15 3.358 11.642 0 7.5 0zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill={color} fill-rule="evenodd" />
  </svg>
);

nearby.propTypes = tabBarIconProps;

export const recent = ({ style, color }) => (
  <svg className={style} width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.063 9.063h-3.126V4.375c0-.518-.42-.938-.937-.938-.518 0-.938.42-.938.938V10c0 .518.42.938.938.938h4.063c.517 0 .937-.42.937-.938s-.42-.938-.938-.938zM10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18.125c-4.487 0-8.125-3.638-8.125-8.125S5.513 1.875 10 1.875 18.125 5.512 18.125 10c0 4.487-3.638 8.125-8.125 8.125z" fill={color} fill-rule="evenodd" />
  </svg>
);

recent.propTypes = tabBarIconProps;

export const legend = ({ style, color }) => (
  <svg className={style} width="22" height="6" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.64 0C1.182 0 0 1.182 0 2.64 0 4.1 1.182 5.28 2.64 5.28c1.458 0 2.64-1.18 2.64-2.64C5.28 1.183 4.1 0 2.64 0zm16.72 0c-1.458 0-2.64 1.182-2.64 2.64 0 1.46 1.182 2.64 2.64 2.64C20.817 5.28 22 4.1 22 2.64 22 1.183 20.817 0 19.36 0zM11 0C9.542 0 8.36 1.182 8.36 2.64c0 1.46 1.18 2.64 2.64 2.64 1.46 0 2.64-1.18 2.64-2.64C13.64 1.183 12.458 0 11 0z" fill={color} fill-rule="evenodd" />
  </svg>
);

legend.propTypes = tabBarIconProps;
