import * as React from 'react';
import { SvgLogo } from '../../utils/interface';
import '../styles.scss';

const IconCrossSvg: React.FC<SvgLogo> = ({ title, alt, width, height, ...props }) => {
  return (
    <svg
      className="svg_icon_cross"
      viewBox="0 0 24 24"
      role="img"
      aria-label={alt}
      width={width}
      height={height}
      {...props}
    >
      <path d="M16.34 9.322a1 1 0 1 0-1.364-1.463l-2.926 2.728L9.322 7.66A1 1 0 0 0 7.86 9.024l2.728 2.926-2.927 2.728a1 1 0 1 0 1.364 1.462l2.926-2.727 2.728 2.926a1 1 0 1 0 1.462-1.363l-2.727-2.926 2.926-2.728z" />
      <title>{title}</title>
      <path
        fillRule="evenodd"
        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11 9a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconCrossSvg;
