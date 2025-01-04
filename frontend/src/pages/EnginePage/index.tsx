import { FC, useEffect, useMemo, useState } from 'react';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
import { useEngineTypes } from '../../hooks/useEngineTypes';
// Types
import { SortOrder } from '../../shared/types/enum.type';
import { Engine, EngineModel } from '../../shared/types/engines.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const [order, setOrder] = useState<string>(SortOrder.ASC);
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([]);
  const [filteredEngines, setFilteredEngines] = useState<Engine[]>([]);
  const [filteredEngineModel, setFilteredEngineModel] = useState<EngineModel[]>([]);
  const [engineModel, setEngineModel] = useState<EngineModel[]>([]);

  // LOad initial data from GraphQl
  const { engineTypes, engineTypesLoading, engineTypesError } = useEngineTypes({});
  const { engines, enginesLoading, enginesError } = useEngines({});

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

  if (enginesLoading || engineTypesLoading) return <p>Loading...</p>;
  if (enginesError || engineTypesError) return <p>Error: {enginesError?.message}</p>;

  return (
    <div className="engine__wrapper">
      <div className="engine__wrapper__title">QUEL VEHICULE SOUHAITEZ-VOUS CONDUIRE ?</div>
      <hr className="engine__wrapper__hr"></hr>
      <Filters
        order={order}
        setOrder={setOrder}
        selectedEngineTypes={selectedEngineTypes}
        setSelectedEngineTypes={setSelectedEngineTypes}
        selectedEngineModel={selectedEngineModel}
        setSelectedEngineModel={setSelectedEngineModel}
        engineTypesList={engineTypes}
        engineModelList={filteredEngineModel}
      />
      <EngineList enginesList={filteredEngines} />
    </div>
  );
};

export default EnginePage;
