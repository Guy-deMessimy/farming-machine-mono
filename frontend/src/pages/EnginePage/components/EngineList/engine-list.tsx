import { FC, Fragment, useRef, useState } from 'react';

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
  const subcardRef = useRef<HTMLLIElement>(null);

  const toggleSubCard = (engineId: number) => {
    setActiveEngineId((prev) => (prev === engineId ? null : engineId));
    setTimeout(() => {
      if (subcardRef.current) {
        subcardRef.current.focus();
        subcardRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 100);
  };

  const handleClose = () => {
    setActiveEngineId(null);
  };

  return (
    <ul className="engine__list">
      {enginesList.map((engine: Engine) => (
        <Fragment key={engine.id}>
          <li className="engine__list__item" key={engine.id} onClick={() => toggleSubCard(engine.id)}>
            <EngineCard engineItem={engine} />
          </li>
          {activeEngineId === engine.id && (
            <li className="engine__list__subcard" key={`subcard-${engine.id}`} ref={subcardRef}>
              <SubCard engineItem={engine} handleClose={handleClose} />
            </li>
          )}
        </Fragment>
      ))}
    </ul>
  );
};

export default EngineList;
