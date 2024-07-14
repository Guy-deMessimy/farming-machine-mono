import React from 'react';
import FarmingMachineLogoSvg from './svg/index';
import './styles.scss';

interface Logo {
  title: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const FarmingMachineLogo: React.FC<Logo> = ({ title, alt, width, height }) => {
  return (
    <div className="logo">
      <FarmingMachineLogoSvg title={title} alt={alt} width={width} height={height} />
    </div>
  );
};

export default FarmingMachineLogo;
