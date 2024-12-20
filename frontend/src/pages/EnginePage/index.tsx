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
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([]);
  const orderBy = useMemo(() => {
    return order.length > 0 ? { brandName: order } : {};
  }, [order]);

  const where = useMemo(() => {
    // engineModelId
    return selectedEngineTypes.length > 0 ? { engineTypeId: selectedEngineTypes } : {};
  }, [selectedEngineTypes]);

  const { engineTypes, engineTypesLoading, engineTypesError } = useEngineTypes({});
  const { engineModel, engineModelLoading, engineModelError } = useEngineModel({});
  const { engines, enginesLoading, enginesError } = useEngines({ orderBy, where });
  console.log('AAA engineModel', engineModel);

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
