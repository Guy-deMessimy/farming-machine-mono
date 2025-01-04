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
      <div className="engine__subcard__photo">
        <img className="engine__subcard__photo__img" src={engineItem.imageUrl} alt="Machine" />
      </div>
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
        <Link to={`/engine/${engineItem.id}`} className="engine__subcard__link">
          Voir plus de détails
        </Link>
      </div>
    </div>
  );
};

export default SubCard;
