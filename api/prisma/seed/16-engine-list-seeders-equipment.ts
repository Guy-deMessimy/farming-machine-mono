import { generateEngineList } from "./3-populate-engines";

const modelname = {
  cereals: [
    'Premia 3000',
    'Tramline CX',
  ],
  single_seeds: [
    'NG Plus 4',
    'ED 6000-2C',
  ],
};

const brandname = {
  cereals: [
    'Kuhn',
    'Sulky',
  ],
  single_seeds: [
    'Monosem',
    'Amazone',
  ],
};

const images = {
  cereals: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/seeders/semoirs-cereales-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/seeders/semoirs-cereales-2.png',
  ],
  single_seeds: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/seeders/semoirs-monograine-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/seeders/semoirs-monograine-2.png',
  ],
};

export const ENGINE_LIST_SEEDERS_EQUIPMENT_CEREALS = generateEngineList(modelname['cereals'], brandname['cereals'], 2, 'Semoirs céréales', images['cereals']);
export const ENGINE_LIST_WOOD_TRACTORS_SINGLE_SEEDS = generateEngineList(modelname['single_seeds'], brandname['single_seeds'], 2, 'Semoirs monograine', images['single_seeds']);