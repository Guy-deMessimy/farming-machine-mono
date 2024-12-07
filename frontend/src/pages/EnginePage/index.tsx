import { useState } from 'react';
// Components
import BrandFilter from './components/EngineFilter/brand-filter';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { DEFAULT_ENGINE_ORDER_BY } from '../../shared/types/engines.type';
import { DropdownOption } from '../../shared/types/filters.type';
// Ui and assets
import './styles.scss';

const EnginePage = () => {
  const [orderBy, setOrderBy] = useState(DEFAULT_ENGINE_ORDER_BY);
  const { engines, loading, error } = useEngines({ orderBy });

  const options: DropdownOption[] = [
    { value: 'ASC', label: 'Marque croissante' },
    { value: 'DESC', label: 'Marque décroissante' },
  ];

  const handleFilterChange = (value: string) => {
    const sortOrderValue = value as SortOrder;
    setOrderBy({ brandName: sortOrderValue });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <BrandFilter options={options} onChange={handleFilterChange} />
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
