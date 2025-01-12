import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

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
      <h1>Détails du moteur</h1>
      {/* Contenu de la page ici */}
    </div>
  );
};

export default EngineDetailsPage;
