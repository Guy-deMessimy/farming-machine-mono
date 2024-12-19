import { generateEngineList } from "./3-populate-engines";

const images = {
    broyeurs: [
      'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
      'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
      'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
    ],
    faucheurs: [

    ],
    epareuses: [

    ],
   
 
 
  };
  
export const ENGINE_LIST_CRUSHERS_BROYEURS = generateEngineList('crushers', 3, images['broyeurs']);
export const ENGINE_LIST_CRUSHERS_FAUCHEURS = generateEngineList('crushers', 3, images['faucheurs']);
export const ENGINE_LIST_CRUSHERS_EPAREUSES = generateEngineList('crushers', 3, images['epareuses']);