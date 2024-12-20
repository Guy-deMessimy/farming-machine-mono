import { generateEngineList } from "./3-populate-engines";

const modelname = {
  moissoneuses_bateuses: [
    '6155M',
    'KS 9105',
    'KS 9105',
    'T5.120',
  ],
  ensileuses: [
    'Bella machina',
    'CL2000',
  ],
  cueilleurs: [
    '967',
    'GX1',
  ]
};

const brandname = {
  moissoneuses_bateuses: [
    'John Deere',
    'Ks Agrotech',
    'Massey Ferguson',
    'New Holland',
  ],
  ensileuses: [
    'Lamborghini',
    'Claas',
  ],
  cueilleurs: [
    'New Holland',
    'Geringhoff',
  ],
};

const images = {
  moissoneuses_bateuses: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/moissoneuse-0.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/moissoneuse-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/moissoneuse-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/moissoneuse-3.png',

  ],
  ensileuses: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/ensileuse-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/ensilseuse-2.png',
  ],
  cueilleurs: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/cueilleur-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/harvests/cueilleur-2.png',
  ]
   
};

export const ENGINE_LIST_HARVEST_COMBINE_HARVESTER = generateEngineList(modelname['moissoneuses_bateuses'], brandname['moissoneuses_bateuses'], 4, 'Moissoneuses', images['moissoneuses_bateuses']);
export const ENGINE_LIST_HARVEST_FORAGE_HARVESTER = generateEngineList(modelname['ensileuses'], brandname['ensileuses'], 2, 'Ensileuses', images['ensileuses']);
export const ENGINE_LIST_HARVEST_PICKER = generateEngineList(modelname['cueilleurs'], brandname['cueilleurs'], 2, 'Cueilleurs', images['cueilleurs']);