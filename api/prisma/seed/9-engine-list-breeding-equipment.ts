import { generateEngineList } from "./3-populate-engines";

const modelname = {
  cattlewoman: [
    'GB 126',
    'Betalight 86',
  ],
  mixer: [
    'Profile 24.2 DL',
    'TrailedLine Classic 12',
  ],
  straw_blower: [
    'Castor+ 60R',
    'Tomahawk 8550',
  ],
  water_barrel: [
    'CiternLight 3200',
    'Aquatrans 7000',
  ]
};

const brandname = {
  cattlewoman: [
    'Boche',
    'Leboulch',
  ],
  mixer: [
    'Kuhn',
    'Siloking',
  ],
  straw_blower: [
    'Lucas',
    'Teagle',
  ],
  water_barrel: [
    'Pichon',
    'Joskin',
  ]
};

const images = {
  cattlewoman: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/cattlewoman-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/cattlewoman-2.png',
  ],
  mixer: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/mixer-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/mixer-2.png',
  ],
  straw_blower: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/straw-blower-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/straw-blower-2.png',
  ],
  water_barrel: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/water-barrel-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/breeding/water-barrel-2.png',
  ]
};

export const ENGINE_LIST_BREEDING_EQUIPMENT_CATTLEWOMAN = generateEngineList(modelname['cattlewoman'], brandname['cattlewoman'], 2, 'Bétaillères', images['cattlewoman']);
export const ENGINE_LIST_BREEDING_EQUIPMENT_MIXER = generateEngineList(modelname['mixer'], brandname['mixer'], 2, 'Mélangeuses', images['mixer']);
export const ENGINE_LIST_BREEDING_EQUIPMENT_STRAW_BLOWER = generateEngineList(modelname['straw_blower'], brandname['straw_blower'], 2, 'Pailleuses', images['straw_blower']);
export const ENGINE_LIST_BREEDING_EQUIPMENT_WATER_BARREL = generateEngineList(modelname['water_barrel'], brandname['water_barrel'], 2, 'Tonne à eau', images['water_barrel']);


