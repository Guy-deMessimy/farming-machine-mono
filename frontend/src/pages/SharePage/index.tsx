import React from 'react';
import ShareProviderForm from './components';
import './styles.scss';

const SharePage: React.FC = () => {
  return (
    <div className="share__container">
      <h1>Personalized farming machine site</h1>
      <ShareProviderForm />
    </div>
  );
};

export default SharePage;
