import { FC } from 'react';
import { Link } from 'react-router-dom';

// Components
import EngineCard from './engine-card';
// Utils
import { Engine } from '../../../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

interface ReportComponentProps {
  enginesList: Engine[];
}

const EngineList: FC<ReportComponentProps> = ({ enginesList }) => {
  return (
    <ul className="engine__list">
      {enginesList.map((engine: Engine) => (
        <li className="engine__list__item" key={engine.id}>
          <Link className="engine__list__item__link" to={engine.id.toString()}>
            <EngineCard engineItem={engine}></EngineCard>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EngineList;
