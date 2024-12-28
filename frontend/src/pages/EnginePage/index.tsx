import { FC, useMemo, useState } from 'react';
// Components
import Filters from './components/EngineFilters/filters';
import EngineList from './components/EngineList/engine-list';
// Hooks
import { useEngines } from '../../hooks/useEngines';
import { useEngineTypes } from '../../hooks/useEngineTypes';
import { useEngineModel } from '../../hooks/useEngineModel';
// Types
import { SortOrder } from '../../shared/types/enum.type';
// Ui and assets
import './styles.scss';

const EnginePage: FC = () => {
  const [order, setOrder] = useState<string>(SortOrder.ASC);
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([0]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([0]);
  const orderBy = useMemo(() => {
    return order.length > 0 ? { brandName: order } : {};
  }, [order]);

  const whereTypes = useMemo(() => {
    if (selectedEngineTypes.length > 0) {
      if (selectedEngineTypes.length === 1 && selectedEngineTypes[0] === 0) {
        return {};
      } else {
        return { engineTypeId: selectedEngineTypes };
      }
    }
    return {};
  }, [selectedEngineTypes]);

  const whereModel = useMemo(() => {
    if (selectedEngineModel.length > 0) {
      if (selectedEngineModel.length === 1 && selectedEngineModel[0] === 0) {
        return {};
      } else {
        return { engineModelId: selectedEngineModel };
      }
    }
    return {};
  }, [selectedEngineModel]);

  const { engineTypes, engineTypesLoading, engineTypesError } = useEngineTypes({});
  const { engineModel, engineModelLoading, engineModelError } = useEngineModel({ where: whereTypes });
  const { engines, enginesLoading, enginesError } = useEngines({ orderBy, where: whereModel });
  // console.log('AAA ');
  // console.log('AAA ');
  // console.log('AAA ');

  if (enginesLoading || engineTypesLoading || engineModelLoading) return <p>Loading...</p>;
  if (enginesError || engineTypesError || engineModelError) return <p>Error: {enginesError?.message}</p>;

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
        engineModelList={engineModel}
      />
      <EngineList enginesList={engines} />
    </div>
  );
};

export default EnginePage;
