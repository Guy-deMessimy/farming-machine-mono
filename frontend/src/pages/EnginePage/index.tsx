import { FC, useState } from 'react';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
import { useEngineTypes } from '../../hooks/useEngineTypes';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { DEFAULT_ENGINE_ORDER_BY } from '../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const [orderBy, setOrderBy] = useState(DEFAULT_ENGINE_ORDER_BY);
  // const limit = 8;
  // const where = { brandName: 'New Holland' };
  const where = { typeId: [10] };
  const { engines, enginesLoading, enginesError } = useEngines({ orderBy, where });
  const { engineTypes, engineTypesLoading, engineTypesError } = useEngineTypes();

  const handleOrderChange = (value: string | null) => {
    const sortOrderValue = value as SortOrder;
    setOrderBy({ brandName: sortOrderValue });
  };

  if (enginesLoading) return <p>Loading...</p>;
  if (enginesError) return <p>Error: {enginesError.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <Filters onOrderChange={handleOrderChange} engineTypesList={engineTypes} />
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
