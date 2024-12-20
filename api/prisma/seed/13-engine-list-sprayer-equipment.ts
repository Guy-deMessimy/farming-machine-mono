import { generateEngineList } from "./3-populate-engines";

const modelname = {
  atomizer: [
    'Rafale 1200',
    'Fructair 3000',
  ],
  sprayer: [
    'UX 5201 Super',
    'R962i',
  ],
  winder: [
    'Optima 110',
    'Magnum 110',
  ],
};

const brandname = {
  atomizer: [
    'Nicolas',
    'Berthoud',
  ],
  sprayer: [
    'Amazone',
    'John Deere',
  ],
  winder: [
    'Irrifrance',
    'RM',
  ],
};

const images = {
  atomizer: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/atomizer-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/atomizer-2.png',
  ],
  sprayer: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/sprayer-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/sprayer-2.png',
  ],
  winder: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/winder-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/sprayers/winder-2.png',
  ],
};

export const ENGINE_LIST_SPRAYER_EQUIPMENT_ATOMIZER = generateEngineList(modelname['atomizer'], brandname['atomizer'], 2, 'Atomiseurs', images['atomizer']);
export const ENGINE_LIST_SPRAYER_EQUIPMENT = generateEngineList(modelname['sprayer'], brandname['sprayer'], 2, 'Pulvérisateurs', images['sprayer']);
export const ENGINE_LIST_SPRAYER_WINDER = generateEngineList(modelname['winder'], brandname['winder'], 2, 'Enrouleurs', images['winder']);