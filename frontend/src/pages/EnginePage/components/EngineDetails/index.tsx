import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './styles.scss';

const EngineDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={() => {
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate('/engines'); // Page par défaut si aucun historique
          }
        }}
      >
        Retour
      </Button>
      <div className="enine__details__container">
        {' '}
        <p>Bloc photos de machines et tableau de caractéristiques</p>
        <p>Bloc profil du proprietaire</p>
        <p>Bloc dates, agences de retrait et localisation</p>
      </div>
    </div>
  );
};

export default EngineDetailsPage;
