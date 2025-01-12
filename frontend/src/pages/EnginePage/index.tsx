import { FC, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
import { useEngineTypes } from '../../hooks/useEngineTypes';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { Engine, EngineModel, EngineTypes } from '../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({ type: '', brand: '' });
  const [order, setOrder] = useState<string>(SortOrder.ASC);
  const [engineTypes, setEngineTypes] = useState<EngineTypes[]>([]);
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([]);
  const [engineModel, setEngineModel] = useState<EngineModel[]>([]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([]);
  const [filteredEngines, setFilteredEngines] = useState<Engine[]>([]);
  const [filteredEngineModel, setFilteredEngineModel] = useState<EngineModel[]>([]);
  const { engines, enginesLoading, enginesError } = useEngines({});

  // Synchroniser les filtres avec les paramètres d’URL
  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   setFilters({
  //     type: searchParams.get('type') || '',
  //     brand: searchParams.get('brand') || '',
  //   });
  // }, [location.search]);

  // const handleFilterChange = (key: 'type' | 'brand', value: string | number) => {
  //   const newFilters: Record<string, string> = {
  //     ...filters,
  //     [key]: value.toString(), // Convertit en chaîne pour compatibilité avec les URL
  //   };
  //   setFilters(newFilters as { type: string; brand: string });

  //   const searchParams = new URLSearchParams(newFilters);
  //   navigate(`?${searchParams.toString()}`, { replace: true });
  // };

  const handleFilterChange = (key: string, value: string | number[]) => {
    switch (key) {
      case 'engineTypes':
        setSelectedEngineTypes(value as number[]);
        break;
      case 'engineModels':
        setSelectedEngineModel(value as number[]);
        break;
      case 'order':
        setOrder(value as string);
        break;
      default:
        console.warn(`Unknown filter key: ${key}`);
    }
  };

  useEffect(() => {
    if (!enginesLoading && engines) {
      const uniqueEngineModels = engines
        .flatMap((engine: Engine) => engine.engineModel)
        .filter(
          (model: EngineModel, index: number, self: EngineModel[]) =>
            index === self.findIndex((m) => m.id === model.id),
        );
      setEngineModel(uniqueEngineModels);
    }
  }, [engines, enginesLoading]);

  useEffect(() => {
    if (!enginesLoading && engineModel) {
      const uniqueEngineTypes = engineModel
        .flatMap((model: EngineModel) => model.engineType)
        .filter(
          (model: EngineTypes, index: number, self: EngineTypes[]) =>
            index === self.findIndex((m) => m.id === model.id),
        );
      setEngineTypes(uniqueEngineTypes);
    }
  }, [engineModel]);

  useEffect(() => {
    let filtered = engineModel;
    if (selectedEngineTypes.length > 0) {
      filtered = engineModel.filter((model: EngineModel) => selectedEngineTypes.includes(Number(model.engineType.id)));
    }
    setFilteredEngineModel(filtered);
  }, [selectedEngineTypes, engineModel]);

  useEffect(() => {
    if (!enginesLoading && engines) {
      setFilteredEngines(engines);
    }
  }, [engines, enginesLoading]);

  useEffect(() => {
    let filtered = engines;

    if (selectedEngineTypes.length > 0) {
      filtered = filtered.filter((engine: Engine) =>
        selectedEngineTypes.includes(Number(engine.engineModel.engineType.id)),
      );
    }

    if (selectedEngineModel.length > 0) {
      filtered = filtered.filter((engine: Engine) => selectedEngineModel.includes(Number(engine.engineModel.id)));
    }

    if (order) {
      order.length > 0
        ? (filtered = [...filtered].sort((a: Engine, b: Engine) =>
            order === SortOrder.ASC ? a.brandName.localeCompare(b.brandName) : b.brandName.localeCompare(a.brandName),
          ))
        : {};
    }

    setFilteredEngines(filtered);
  }, [selectedEngineTypes, selectedEngineModel, order, engines]);

  if (enginesLoading) return <p>Loading...</p>;
  if (enginesError) return <p>Error: {enginesError?.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <Filters
        order={order}
        selectedEngineTypes={selectedEngineTypes}
        selectedEngineModel={selectedEngineModel}
        engineTypesList={engineTypes}
        engineModelList={filteredEngineModel}
        handleFilterChange={handleFilterChange}
      />
      <EngineList enginesList={filteredEngines} />
    </div>
  );
};

export default EnginePage;
