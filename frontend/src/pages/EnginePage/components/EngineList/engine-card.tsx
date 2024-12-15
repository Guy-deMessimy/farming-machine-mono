import { FC } from 'react';
// Type
import { Engine } from '../../../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

interface ReportComponentProps {
  engineItem: Engine;
}

const EngineCard: FC<ReportComponentProps> = ({ engineItem }) => {
  console.log('engineItem', engineItem);
  return (
    <div className="engine__card">
      <div className="engine__card__title">{`${engineItem.brandName} ${engineItem.modelName}`} | ou similaire</div>
      <>moissonneuse</>
      <img className="engine__card__photo" src={engineItem.imageUrl} alt="Machine" />
    </div>
  );
};

export default EngineCard;
