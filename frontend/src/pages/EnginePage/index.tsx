// Components
import EngineList from './components/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
// Ui and assets
import './styles.scss';
import EngineFilter from './components/engine-filter';
import { EngineOrderByInput, SortOrder } from '../../graphql/engines/queries/engines.interface';
import { useState } from 'react';

const EnginePage = () => {
  const defaultOrderBy: EngineOrderByInput = { brandName: SortOrder.DESC };
  const [orderBy, setOrderBy] = useState(defaultOrderBy); // Valeur initiale

  const { engines, loading, error } = useEngines(orderBy);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (value: any) => {
    setOrderBy({ brandName: value });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <EngineFilter onChange={handleFilterChange} />
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
