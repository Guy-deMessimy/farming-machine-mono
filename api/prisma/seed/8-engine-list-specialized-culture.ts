import { generateEngineList } from "./3-populate-engines";

const modelname = {
  windrowers: [
    'GA 13031',
    'Swadro TC 1370',
    'Liner 4000',
  ],
  beet_harvester: [
    'Terra Dos T4',
    'Tiger 6S',
    'Rexor 630',
  ],
  potato_planter: [
    'Eho 240S',
    'Structural 4000',
    'CP 42',
  ],
};

const brandname = {
  windrowers: [
    'Kuhn',
    'Krone',
    'Claas',
  ],
  beet_harvester: [
    'Holmer',
    'Ropa',
    'Grimme',
  ],
  potato_planter: [
    'Standen',
    'Dewulf',
    'Miedema',
  ],
};

const images = {
  windrowers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/windrowers-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/windrowers-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/windrowers-3.png',
  ],
  beet_harvester: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/beet-harvester-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/beet-harvester-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/beet-harvester-3.png',
  ],
  potato_planter: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/potato-planter-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/potato-planter-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/specialized-culture/potato-planter-3.png',
  ],
};

export const ENGINE_LIST_SPECIALIZED_CULTURE_WINDROWERS = generateEngineList(modelname['windrowers'], brandname['windrowers'], 3, 'Andaineurs', images['windrowers']);
export const ENGINE_LIST_SPECIALIZED_CULTURE_BEET_HARVESTER = generateEngineList(modelname['beet_harvester'], brandname['beet_harvester'], 3, 'Arracheuses de betteraves', images['beet_harvester']);
export const ENGINE_LIST_SPECIALIZED_CULTURE_POTATO_PLANTER = generateEngineList(modelname['potato_planter'], brandname['potato_planter'], 3, 'Planteuses de pommes de terre', images['potato_planter']);