import React from 'react';
import FarmingMachineLogoSvg from './svg/index';
import { Logo } from '../utils/interface';
import './styles.scss';

const FarmingMachineLogo: React.FC<Logo> = ({ title, alt, width, height }) => {
  return (
    <div className="logo">
      <FarmingMachineLogoSvg title={title} alt={alt} width={width} height={height} />
    </div>
  );
};

export default FarmingMachineLogo;
