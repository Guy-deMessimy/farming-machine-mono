import { generateEngineList } from "./3-populate-engines";

const modelname = {
  wrapper: [
    'RW 1610 C',
    'Orbital 1100',
  ],
  tedder: [
    'KW 8.82/8',
    'HIT 8.81',
  ],
  baler_press: [
    'Variant 485 RC',
    'Roll Belt 180',
  ],
};

const brandname = {
  wrapper: [
    'Kuhn',
    'Mc Hale',
  ],
  tedder: [
    'Krone',
    'Pottinger',
  ],
  baler_press: [
    'Claas',
    'New Holland',
  ],
};

const images = {
  wrapper: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/wrapper-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/wrapper-2.png',
  ],
  tedder: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/tedder-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/tedder-2.png',
  ],
  baler_press: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/baler-press-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/haymaking/baler-press-2.png',
  ],
};

export const ENGINE_LIST_HAYMAKING_EQUIPMENT_WRAPPER = generateEngineList(modelname['wrapper'], brandname['wrapper'], 2, 'Enrubanneuses', images['wrapper']);
export const ENGINE_LIST_HAYMAKING_EQUIPMENT_TEDDER = generateEngineList(modelname['tedder'], brandname['tedder'], 2, 'Faneurs', images['tedder']);
export const ENGINE_LIST_HAYMAKING_EQUIPMENT_BALER_PRESS = generateEngineList(modelname['baler_press'], brandname['baler_press'], 2, 'Presse à balles', images['baler_press']);
