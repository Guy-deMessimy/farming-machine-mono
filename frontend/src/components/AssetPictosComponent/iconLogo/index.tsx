import React from 'react';
import { useNavigate } from 'react-router-dom';
import FarmingMachineLogoSvg from './svg/index';
import { Icon } from '../utils/interface';
import './styles.scss';

const FarmingMachineLogo: React.FC<Icon> = ({ title, alt, width, height, path }) => {
  const navigate = useNavigate();
  return (
    <div className="logo" onClick={() => navigate(path)}>
      <FarmingMachineLogoSvg title={title} alt={alt} width={width} height={height} />
    </div>
  );
};

export default FarmingMachineLogo;
