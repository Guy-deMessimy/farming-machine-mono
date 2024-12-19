import { generateEngineList } from "./3-populate-engines";

const modelname = {
  tracteurs_agricole: [
    'Ideal 9T',
    'Tucano 580',
    'Axial-flow 4000',
    'Trion 750',
    'CR10.90',
    'John Deere',
    'Lexion 8900',
  ],
  tracteurs_forrestier: [
    'Komatsu',
    'Ponsse',
  ],
};

const brandname = {
  tracteurs_agricole: [
    'Fendt',
    'Massey Ferguson',
    'Case IH',
    'Deutz-Fahr',
    'New Holland',
    'John Deere',
    'Claas'
  ],
  tracteurs_forrestier: [
    'Ideal 9T',
    'Tucano 580',
  ],
};

const images = {
  tracteurs_agricole: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-0.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-3.png',  
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-4.png', 
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-5.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-6.png',
  ],
  tracteurs_forrestier: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-7.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/tractors/tracteur-8.png',
  ],
};

export const ENGINE_LIST_TRACTORS = generateEngineList(modelname['tracteurs_agricole'], brandname['tracteurs_agricole'], 7, 'Tracteurs agricole', images['tracteurs_agricole']);
export const ENGINE_LIST_WOOD_TRACTORS = generateEngineList(modelname['tracteurs_forrestier'], brandname['tracteurs_forrestier'], 2, 'tracteurs forrestier', images['tracteurs_forrestier']);
