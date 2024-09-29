import { FC } from 'react';
// Utils
import { EngineModel } from '../utils/engine-model';
// Ui and assets
import MachinePhoto from '../../../assets/machine.png';
import '../styles.scss';

interface ReportComponentProps {
  engineItem: EngineModel;
}

const EngineCard: FC<ReportComponentProps> = ({ engineItem }) => {
  console.log('engineItem', engineItem);
  return (
    <div className="engine__card">
      <div className="engine__card__title">{`${engineItem.brandName} ${engineItem.modelName}`}</div>
      <>ou similaire | moissonneuse</>
      <img className="engine__card__photo" src={engineItem.imageUrl} alt="Machine" />
    </div>
  );
};

export default EngineCard;
