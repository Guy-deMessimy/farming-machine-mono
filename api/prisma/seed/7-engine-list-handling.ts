import { generateEngineList } from "./3-populate-engines";

const modelname = {
  front_loader: [
    'MX T418',
    'ProfiLine FZ 60.1',
  ],
  pallet_lift: [
    'PFB 25 N',
    'Quicke Silograb 150',
  ],
};

const brandname = {
  front_loader: [
    'Mailleux',
    'Stoll',
  ],
  pallet_lift: [
    'Manitou',
    'Alö',
  ],
};

const images = {
  front_loader: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/handling/front-loader-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/handling/front-loader-2.png',

  ],
  pallet_lift: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/handling/pallet-lift-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/handling/pallet-lift-2.png',
  ],
};

export const ENGINE_LIST_HANDLING_FRONT_LOADER = generateEngineList(modelname['front_loader'], brandname['front_loader'], 2, 'Chargeur frontal', images['front_loader']);
export const ENGINE_LIST_HANDLING_PALLET_LIFT = generateEngineList(modelname['pallet_lift'], brandname['pallet_lift'], 2, 'Lèves palette', images['pallet_lift']);