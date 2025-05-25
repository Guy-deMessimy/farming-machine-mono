import { Fragment } from 'react/jsx-runtime';
import './styles.scss';

const WelcomePage = () => {
  return (
    <Fragment>
      <main className="welcome-page">
        <p>Learn more about Farming Machine</p>
      </main>
      <div className="other-page">
        <h2>LOUER PERFORMANT A PRIX ATTRACTIF</h2>
        <p>Location de machines agricoles au meilleur prix Partout en France</p>
      </div>
    </Fragment>
  );
};

export default WelcomePage;
