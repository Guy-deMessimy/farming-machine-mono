import React from 'react';
import IconCrossSvg from './svg/index';
import { Icon } from '../utils/interface';
import './styles.scss';

const IconCross: React.FC<Icon> = ({ title, alt, width, height, onclick }) => {
  return (
    <div className="icon_cross">
      <IconCrossSvg title={title} alt={alt} width={width} height={height} onClick={onclick} />
    </div>
  );
};

export default IconCross;
