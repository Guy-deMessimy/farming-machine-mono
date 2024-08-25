import { useState } from 'react';
import { useQuery } from '@apollo/client';

// Components
import { dummyEngineList } from './components/machine-dummy-list';
import MachineList from './components/machine-list';

// Utils
import { Engine } from './utils/machine-model';
import { useEngines } from '../../hooks/useEngines';
// import { GET_CATEGORIES } from '../../graphql/engines/queries/getEngines.query';

// Ui and assets
import './styles.scss';

const MachinePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [engineList, setEngineList] = useState<Array<Engine>>(dummyEngineList);
  const { engines, loading, error } = useEngines();
  console.log('engines', engines);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="machine__wrapper">
      <div className="machine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <MachineList engineList={engineList} />
    </div>
  );
};

export default MachinePage;
