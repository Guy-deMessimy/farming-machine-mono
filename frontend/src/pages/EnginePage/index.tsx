// Components
import EngineList from './components/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
// Ui and assets
import './styles.scss';

const EnginePage = () => {
  const { engines, loading, error } = useEngines();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
