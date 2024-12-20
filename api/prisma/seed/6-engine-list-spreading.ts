import { generateEngineList } from "./3-populate-engines";

const modelname = {
  buryer: [
    'Terrasoc 6000',
    'TCI 6300',
  ],
  spreader: [
    'X50+ Econov',
    'ZA-V 4200',
  ],
  slurry_ton: [
    'PG II 25',
    'Double Twin Shift 30000',
  ],
};


const brandname = {
  buryer: [
    'Joskin',
    'Pichon',
  ],
  spreader: [
    'Sulky',
    'Amazone',
  ],
  slurry_ton: [
    'Samson',
    'Kaweco',
  ],
};

const images = {
  buryer: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/buryer-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/buryer-2.png',
  ],
  spreader: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/spreader-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/spreader-2.png',
  ],
  slurry_ton: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/slurry-ton-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/spreading/slurry-ton-2.png',
  ],
};

export const ENGINE_LIST_SPREADING_BURYER = generateEngineList(modelname['buryer'], brandname['buryer'], 2, 'Enfouisseurs', images['buryer']);
export const ENGINE_LIST_SPREADING_SPREADER = generateEngineList(modelname['spreader'], brandname['spreader'], 2, 'Epandeurs', images['spreader']);
export const ENGINE_LIST_SPREADING_SLURRY_TON = generateEngineList(modelname['slurry_ton'], brandname['slurry_ton'], 2, 'Tonne à lisier', images['slurry_ton']);
