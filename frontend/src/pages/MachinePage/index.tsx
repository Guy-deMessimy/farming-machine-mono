import { useState } from 'react';

// Components
import { dummyEngineList } from './components/machine-dummy-list';
import MachineList from './components/machine-list';

// Utils
import { Engine } from './utils/machine-model';

// Ui and assets
import './styles.scss';

const MachinePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [engineList, setEngineList] = useState<Array<Engine>>(dummyEngineList);

  return (
    <div className="machine__wrapper">
      <div className="machine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <MachineList engineList={engineList} />
    </div>
  );
};

export default MachinePage;
