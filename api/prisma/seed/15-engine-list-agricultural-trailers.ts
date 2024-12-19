import { generateEngineList } from "./3-populate-engines";

const modelname = {
  forage_tray: [
    'Rollmax 7340',
    'PF 28',
  ],
  agricultural_trailers: [
    'Cargo 240',
    'LC 180',
  ],
  ferry: [
    'Interbenne 46',
    'GTW 430',
  ],
};

const brandname = {
  forage_tray: [
    'Rolland',
    'Chevance',
  ],
  agricultural_trailers: [
    'Jocquin',
    'La campagne',
  ],
  ferry: [
    'Perard',
    'Bergmann',
  ],
};

const images = {
  forage_tray: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/forage-tray-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/forage-tray-2.png',
  ],
  agricultural_trailers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/agricultural-trailers-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/agricultural-trailers-2.png',
  ],
  ferry: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/ferry-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/trailers/ferry-2.png',
  ],
};

export const ENGINE_LIST_AGRICULTURAL_TRAILERS_FORAGE_TRAY = generateEngineList(modelname['forage_tray'], brandname['forage_tray'], 2, 'Plateau fourrager', images['forage_tray']);
export const ENGINE_LIST_AGRICULTURAL_TRAILERS = generateEngineList(modelname['agricultural_trailers'], brandname['agricultural_trailers'], 2, 'Remorques', images['agricultural_trailers']);
export const ENGINE_LIST_AGRICULTURAL_TRAILERS_FERRY = generateEngineList(modelname['ferry'], brandname['ferry'], 2, 'Transbordeur', images['ferry']);

 