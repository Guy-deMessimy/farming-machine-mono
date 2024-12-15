import { FC, useState } from 'react';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { DEFAULT_ENGINE_ORDER_BY, EngineOrderByInput } from '../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const [orderBy, setOrderBy] = useState(DEFAULT_ENGINE_ORDER_BY);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const limit = 8;
  const where = { brandName: 'New Holland' };
  const { engines, loading, error } = useEngines({ orderBy });

  const handleOrderChange = (value: string | null) => {
    const sortOrderValue = value as SortOrder;
    setOrderBy({ brandName: sortOrderValue });
  };

  // const handleCategoryChange = (value: string | null) => {
  //   console.log('AAA value', value);
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <Filters onOrderChange={handleOrderChange} />
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
