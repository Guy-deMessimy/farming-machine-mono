import React from 'react';
import IconUserSvg from './svg/index';
import { Icon } from '../utils/interface';
import './styles.scss';

const IconUser: React.FC<Icon> = ({ title, alt, width, height }) => {
  return (
    <div className="user">
      <IconUserSvg title={title} alt={alt} width={width} height={height} />
    </div>
  );
};

export default IconUser;
