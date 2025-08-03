import { Link } from 'react-router-dom';

const AccessDeniedPage = () => {
  return (
    <div>
      <div>
        <h1>403</h1>
        <h2>Accès refusé</h2>
        <p>Vous avez pas les permissions requises pour accéder à cette page.</p>
        <Link to="/" className="">
          Retour à accueil
        </Link>
      </div>
    </div>
  );
};

export default AccessDeniedPage;
