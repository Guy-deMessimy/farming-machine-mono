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
import { EngineModel } from '../../shared/types/engines.type';

const EnginePage: FC = () => {
  const [order, setOrder] = useState<string>(SortOrder.ASC);
  const [selectedEngineTypes, setSelectedEngineTypes] = useState<number[]>([0]);
  const [selectedEngineModel, setSelectedEngineModel] = useState<number[]>([0]);
  const orderBy = useMemo(() => {
    return order.length > 0 ? { brandName: order } : {};
  }, [order]);

  // const where = useMemo(() => {
  //   if (selectedEngineTypes.length > 0) {
  //     if (selectedEngineTypes.length === 1 && selectedEngineTypes[0] === 0) {
  //       return {};
  //     } else {
  //       return { engineTypeId: selectedEngineTypes };
  //     }
  //   }
  //   return {};
  // }, [selectedEngineTypes]);

  const where = useMemo(() => {
    if (selectedEngineTypes.length > 0) {
      if (selectedEngineTypes.length === 1 && selectedEngineTypes[0] === 0) {
        return {};
      } else {
        return { engineTypeId: selectedEngineTypes };
      }
    }
    return {};
  }, [selectedEngineTypes]);

  // console.log('AAA selectedEngineTypes', selectedEngineTypes);
  // console.log('AAA WHERE', where);

  // selectionner les types => recuperer la liste des types => la passer à la route des models pour recuperer les models
  // la passer a la route des machines => mise a jour de la liste des machines
  // choisir les models => recuperer la liste des models => la passer a la liste des machines => mise a jour de la list des machines

  const { engineTypes, engineTypesLoading, engineTypesError } = useEngineTypes({});
  const { engineModel, engineModelLoading, engineModelError } = useEngineModel({ where });
  const { engines, enginesLoading, enginesError } = useEngines({ orderBy });
  console.log('AAA selectedEngineTypes', selectedEngineTypes);
  console.log('AAA where', where);
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
