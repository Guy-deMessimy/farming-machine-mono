import React, { FC } from 'react';
import { Link } from 'react-router-dom';

// Components
import MachineCard from './machine-card';
import { Engine } from '../utils/machine-model';
import '../styles.scss';

interface ReportComponentProps {
  engineList: Engine[];
}

const MachineList: FC<ReportComponentProps> = ({ engineList }) => {
  return (
    <ul className="machine__list">
      {engineList.map((engine: Engine) => (
        <li className="machine__list__item" key={engine.id}>
          <Link className="machine__list__item__link" to={engine.id.toString()}>
            <MachineCard engineItem={engine}></MachineCard>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MachineList;
