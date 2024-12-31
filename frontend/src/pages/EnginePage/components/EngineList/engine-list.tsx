import { FC, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import EngineCard from './engine-card';
import SubCard from './engine-sub-card';
// Utils
import { Engine } from '../../../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

interface ReportComponentProps {
  enginesList: Engine[];
}

const EngineList: FC<ReportComponentProps> = ({ enginesList }) => {
  const [activeEngineId, setActiveEngineId] = useState<number | null>(null);

  const toggleSubCard = (engineId: number) => {
    setActiveEngineId((prev) => (prev === engineId ? null : engineId)); // Toggle sub-card visibility
  };

  return (
    <ul className="engine__list">
      {enginesList.map((engine: Engine, index: number) => (
        <Fragment key={engine.id}>
          <li className="engine__list__item" key={engine.id} onClick={() => toggleSubCard(engine.id)}>
            <EngineCard engineItem={engine} />
          </li>
          {activeEngineId === engine.id && (
            <li className="engine__list__subcard" key={`subcard-${engine.id}`}>
              <SubCard engineItem={engine} />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default EngineList;
