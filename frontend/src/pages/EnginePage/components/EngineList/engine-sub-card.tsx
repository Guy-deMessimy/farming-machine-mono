import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radio, Space, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Modal } from 'antd';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onPriceChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPriceValue(e.target.value);
  };

  const onHourChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setHourValue(e.target.value);
  };

  const modalContent = (
    <Modal title="Détails du prix" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Voici les détails des prix pour cette machine :</p>
      <hr />
      <ul>
        <li>22.94 € / heure standard</li>
        <li>Forfait journée : 150 €</li>
        <li>Taxe TVA et frais : 20%</li>
        <li>
          <strong>Total TTC : 180 € </strong>
        </li>
      </ul>
    </Modal>
  );
  return (
    <div className="engine__subcard">
      <div className="engine__subcard__photo">
        <img className="engine__subcard__photo__img" src={engineItem.imageUrl} alt="Machine" />
      </div>
      <div className="engine__subcard__details">
        <div className="engine__subcard__details__info">
          <p>
            <strong>Marque :</strong> {engineItem.brandName}
          </p>
          <p>
            <strong>Modèle :</strong> {engineItem.modelName}
          </p>
        </div>

        <div className="engine__subcard__details__price">
          <p>
            <strong>Options de paiement</strong>
          </p>
          <Radio.Group className="engine__subcard__details__price__radio" onChange={onPriceChange} value={priceValue}>
            <Space direction="vertical">
              <Radio value={1}>
                <label className="engine__subcard__details__price__radio__label">
                  <strong>Meilleur prix</strong>
                </label>
                <legend className="engine__subcard__details__price__radio__legend">
                  payez maintenant, annulez et modifiez moyennant des frais
                </legend>
              </Radio>
              <Radio value={2}>
                <label className="engine__subcard__details__price__radio__label">
                  <strong>Restez flexible</strong>:
                </label>
                <legend className="engine__subcard__details__price__radio__legend">
                  payez à la prise en charge, annulez et modifiez gratuitement
                </legend>
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="engine__subcard__details__hour">
          <p>
            <strong>Heures</strong>
          </p>
          <Radio.Group className="engine__subcard__details__hour__radio" onChange={onHourChange} value={hourValue}>
            <Space direction="vertical">
              <Radio value={3}>
                <label className="engine__subcard__details__hour__radio__label">
                  <strong>Forfait heure</strong>
                </label>
                <legend className="engine__subcard__details__hour__radio__legend">
                  25 heures +1.45 € / pour chaque heure supplémentaire
                </legend>
              </Radio>
              <Radio value={4}>
                <label className="engine__subcard__details__hour__radio__label">
                  <strong>Heures illimitées</strong>
                </label>
                <legend className="engine__subcard__details__hour__radio__legend">
                  toutes les heures sont incluses dans le prix
                </legend>
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className="engine__subcard__details__link">
          <div>
            <p className="engine__subcard__details__link__price">
              <strong>Prix :</strong> {'22.94 € / heure'}
            </p>
            <span className="engine__subcard__details__link__info" onClick={showModal}>
              Voir les détails des prix
            </span>
          </div>

          <Button className="engine__subcard__details__link__button" type="link">
            <Link to={`/engine/${engineItem.id}`} className="engine__subcard__link">
              Voir plus de détails
            </Link>
          </Button>
        </div>
      </div>
      {isModalOpen && modalContent}
    </div>
  );
};

export default SubCard;
