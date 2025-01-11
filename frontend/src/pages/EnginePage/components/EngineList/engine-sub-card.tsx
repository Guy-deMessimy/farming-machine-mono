import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Space, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
// Types
import { Engine } from '../../../../shared/types/engines.type';
// Styles
import './styles.scss';

interface SubCardProps {
  engineItem: Engine;
}

const SubCard: FC<SubCardProps> = ({ engineItem }) => {
  console.log('AAA item', engineItem);
  const [priceValue, setPriceValue] = useState(1);
  const [hourValue, setHourValue] = useState(3);

  const onPriceChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPriceValue(e.target.value);
  };

  const onHourChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setHourValue(e.target.value);
  };
  return (
    <div className="engine__subcard">
      <div className="engine__subcard__photo">
        <img className="engine__subcard__photo__img" src={engineItem.imageUrl} alt="Machine" />
      </div>
      <div className="engine__subcard__details">
        <div className="engine__subcard__details">
          <p>
            <strong>Catégorie :</strong> {engineItem.ref}
          </p>
          <p>
            <strong>Marque :</strong> {engineItem.brandName}
          </p>
          <p>
            <strong>Modèle :</strong> {engineItem.modelName}
          </p>
          <p>
            <strong>Conception :</strong> {engineItem.conception}
          </p>
          <p>
            <strong>Description :</strong> {engineItem.description}
          </p>
          <p>
            <strong>Prix :</strong> {'22.94 € / h'}
          </p>
        </div>

        <div className="engine__subcard__details__price">
          <p>
            <strong>Options de paiement</strong>
          </p>
          <Radio.Group onChange={onPriceChange} value={priceValue}>
            <Space direction="vertical">
              <Radio value={1}>
                <strong>Meilleur prix</strong>: payez maintenant, annulez et modifiez moyennant des frais
              </Radio>
              <Radio value={2}>Restez flexible: payez à la prise en charge, annulez et modifiez gratuitement</Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="engine__subcard__details__hour">
          <p>
            <strong>Heures</strong>
          </p>
          <Radio.Group onChange={onHourChange} value={hourValue}>
            <Space direction="vertical">
              <Radio value={3}>
                <strong>Forfait heure</strong>: 25 heures +1.45 € / pour chaque heure supplémentaire
              </Radio>
              <Radio value={4}>Heures illimitées: toutes les heures sont incluses dans le prix</Radio>
            </Space>
          </Radio.Group>
        </div>
        <div>
          <Button className="button" type="link">
            <Link to={`/engine/${engineItem.id}`} className="engine__subcard__link">
              Voir plus de détails
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
