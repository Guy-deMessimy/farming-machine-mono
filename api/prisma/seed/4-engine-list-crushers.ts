import { generateEngineList } from "./3-populate-engines";

const modelname = {
  reaper: [
    'BPR 280',
    'Bufalo 280',
  ],
  trimmers: [
    'Agora 550PA',
    'Optima 500P',
  ],
};

const brandname = {
  reaper: [
    'Kuhn',
    'Maschio',
  ],
  trimmers: [
    'Rousseau',
    'Noremat',
  ],
};

const images = {
  reaper: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/crushers/reaper-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/crushers/reaper-2.png',
  ],
  trimmers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/crushers/trimmer-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/crushers/trimmer-2.png',
  ],
};

export const ENGINE_LIST_CRUSHERS_REAPER = generateEngineList(modelname['reaper'], brandname['reaper'], 2, 'Faucheurs', images['reaper']);
export const ENGINE_LIST_CRUSHERS_TRIMMERS = generateEngineList(modelname['trimmers'], brandname['trimmers'], 2, 'Epareuses', images['trimmers']);
