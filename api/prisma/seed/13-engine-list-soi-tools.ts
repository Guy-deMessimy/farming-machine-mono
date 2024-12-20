import { generateEngineList } from "./3-populate-engines";

const modelname = {
  cattlewoman: [
    '',
    '',
    '',
  ],
  beet_harvester: [
    '',
    '',
    '',
  ],
  potato_planter: [
    '',
    '',
    '',
  ],
};

const brandname = {
  cattlewoman: [
    '',
    '',
    '',
  ],
  beet_harvester: [
    '',
    '',
    '',
  ],
  potato_planter: [
    '',
    '',
    '',
  ],
};

const images = {
  cattlewoman: [
    '',
    '',
    '',
  ],
  beet_harvester: [
    '',
    '',
    '',
  ],
  potato_planter: [
    '',
    '',
    '',
  ],
};

export const ENGINE_LIST_BREEDING_EQUIPMENT = generateEngineList(modelname['windrowers'], brandname['windrowers'], 3, 'Andaineurs', images['windrowers']);
export const ENGINE_LIST_BREEDING_EQUIPMENT = generateEngineList(modelname['beet_harvester'], brandname['beet_harvester'], 3, 'Arracheuses de betteraves', images['beet_harvester']);
export const ENGINE_LIST_BREEDING_EQUIPMENT = generateEngineList(modelname['potato_planter'], brandname['potato_planter'], 3, 'Planteuses de pommes de terre', images['potato_planter']);



export const ENGINE_LIST_BREEDING_EQUIPMENT = generateEngineList('breeding_equipment', 2);
  

export const ENGINE_LIST_SOI_TOOLS = generateEngineList('soi_tools', 4);