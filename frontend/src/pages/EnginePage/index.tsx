import { FC, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import { useNavigate } from 'react-router-dom';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { Engine, EngineModel, EngineTypes } from '../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<string>(SortOrder.ASC);
  const { engines, enginesLoading, enginesError } = useEngines({});
  const [engineTypes, setEngineTypes] = useState<EngineTypes[]>([]);
  const [engineModel, setEngineModel] = useState<EngineModel[]>([]);
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([]);
  const [filteredEngines, setFilteredEngines] = useState<Engine[]>([]);
  const [filteredEngineModel, setFilteredEngineModel] = useState<EngineModel[]>([]);

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

  // Mise à jour des types uniques d'engines
  useEffect(() => {
    if (!enginesLoading && engineModel.length > 0) {
      const uniqueEngineTypes = engineModel
        .flatMap((model: EngineModel) => model.engineType)
        .filter(
          (model: EngineTypes, index: number, self: EngineTypes[]) =>
            index === self.findIndex((m) => m.id === model.id),
        );
      if (!isEqual(uniqueEngineTypes, engineTypes)) {
        setEngineTypes(uniqueEngineTypes);
      }
    }
  }, [engineModel]);

  // Mise à jour des modèles uniques d'engines
  useEffect(() => {
    if (!enginesLoading && engines.length > 0) {
      const uniqueEngineModels = engines
        .flatMap((engine: Engine) => engine.engineModel)
        .filter(
          (model: EngineModel, index: number, self: EngineModel[]) =>
            index === self.findIndex((m) => m.id === model.id),
        );
      if (!isEqual(uniqueEngineModels, engineModel)) {
        setEngineModel(uniqueEngineModels);
      }
    }
  }, [engines, enginesLoading]);

  const applyFilters = () => {
    if (!engines) {
      setFilteredEngines([]);
      setFilteredEngineModel([]);
      return;
    }

    if (!enginesLoading && engines?.length > 0) {
      // Filtrage des models
      const filteredModels =
        selectedEngineTypes.length > 0
          ? engineModel.filter((model) => selectedEngineTypes.includes(Number(model.engineType.id)))
          : engineModel;
      setFilteredEngineModel(filteredModels);

      // Filtrage des engines
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
        filtered = [...filtered].sort((a, b) =>
          order === SortOrder.ASC ? a.brandName.localeCompare(b.brandName) : b.brandName.localeCompare(a.brandName),
        );
      }

      setFilteredEngines(filtered);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [engines, engineModel, selectedEngineTypes, selectedEngineModel, order, enginesLoading]);

  const errorContent = (
    <div className="locked-section">
      <p>🔒 Connectez-vous pour afficher les moteurs disponibles.</p>
      <p>Error: {enginesError?.message}</p>
      <button onClick={() => navigate('/auth?mode=login')}>Se connecter</button>
    </div>
  );

  if (enginesLoading) return <p>Loading...</p>;
  if (enginesError) return errorContent;

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
