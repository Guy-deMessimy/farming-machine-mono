import MachinePhoto from '../../../assets/machine.png';
import '../styles.scss';
import React, { FC } from 'react';

interface ReportComponentProps {
  engineItem: {
    brandName: string;
    modelName: string;
  };
}

const MachineCard: FC<ReportComponentProps> = ({ engineItem }) => {
  return (
    <div className="machine__card">
      <div className="machine__card__title">{`${engineItem.brandName} ${engineItem.modelName}`}</div>
      <>ou similaire | moissonneuse</>
      <img className="machine__card__photo" src={MachinePhoto} alt="Machine" />
    </div>
  );
};

export default MachineCard;
