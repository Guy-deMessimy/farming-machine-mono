import { generateEngineList } from "./3-populate-engines";

const modelname = {
  growers: [
    'Korund 8/750 K',
    'Prolander 6000',
  ],
  trimmers: [
    'EcoCut 12',
    'Classic 12m',
  ],
  harrows: [
    'Aerostar-Exact 1200',
    'Allrounder 750',
  ],
  dethatcher: [
    'Terrano 5 FM',
    'Carrier XL 625',
  ],
};

const brandname = {
  growers: [
    'Lemken',
    'Kuhn',
  ],
  trimmers: [
    'Carré',
    'Dario',
  ],
  harrows: [
    'Einbock',
    'Kockerling',
  ],
  dethatcher: [
    'Horsch',
    'Vaderstad',
  ],
};

const images = {
  growers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/growers-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/growers-2.png',
  ],
  trimmers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/trimmers-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/trimmers-2.png',
  ],
  harrows: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/harrows-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/harrows-2.png',
  ],
  dethatcher: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/dethatcher-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/soi-tools/dethatcher-2.png',
  ],
};

export const ENGINE_LIST_SOI_TOOLS_GROWERS = generateEngineList(modelname['growers'], brandname['growers'], 2, 'Cultivateurs', images['growers']);
export const ENGINE_LIST_SOI_TOOLS_TRIMMERS = generateEngineList(modelname['trimmers'], brandname['trimmers'], 2, 'Ecimeuses', images['trimmers']);
export const ENGINE_LIST_SOI_TOOLS_HARROWS = generateEngineList(modelname['harrows'], brandname['harrows'], 2, 'Herses', images['harrows']);
export const ENGINE_LIST_SOI_TOOLS_DETHATCHER = generateEngineList(modelname['dethatcher'], brandname['dethatcher'], 2, 'Déchaumeur', images['dethatcher']);