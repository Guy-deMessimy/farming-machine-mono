import { FC } from 'react';
import { Link } from 'react-router-dom';
// Types
import { Engine } from '../../../../shared/types/engines.type';
// Styles
import './styles.scss';

interface SubCardProps {
  engineItem: Engine;
}

const SubCard: FC<SubCardProps> = ({ engineItem }) => {
  return (
    <div className="engine__subcard">
      <div className="engine__subcard__details">
        <p>
          <strong>Référence :</strong> {engineItem.ref}
        </p>
        <p>
          <strong>Marque :</strong> {engineItem.brandName}
        </p>
        <p>
          <strong>Modèle :</strong> {engineItem.modelName}
        </p>
      </div>
      <Link to={`/engine/${engineItem.id}`} className="engine__subcard__link">
        Voir plus de détails
      </Link>
    </div>
  );
};

export default SubCard;
