import { generateEngineList } from "./3-populate-engines";

const modelname = {
  quads: [
    'Sportsman 570 X2',
    'Grizzly 700 EPS',
    'Outlander 6x6 Pro+',
  ],
  nacelles: [
    '200 ATJ',
    'Z-45/25J',
    'HA16 RTJ Pro',
  ],
  sweeper: [
    'Balayeuse Premium',
    'Balayeuse BF 240',
    'K 1500 Pro',
  ],
  snow_blade: [
    'Léopard 2800',
    'PUV-3300',
    'Agri 3000',
  ],
  drones: [
    'Agras T30',
    'P40 Agricultural Drone',
    'Bluegrass Fields'
  ],
  truck: [
    'FH16 750',
    'Actros 2553',
    'R 580 V8',
    'T High 520',
  ],
  pickup: [
    'Classe X',
    'Alaskan',
    'Hilux', 
  ]
};

const brandname = {
  quads: [
    'Polaris',
    'Yamaha',
    'CAM-AM',
  ],
  nacelles: [
    'Manitou',
    'Génie',
    'Haulotte',
  ],
  sweeper: [
    'Emily',
    'Majar',
    'Kersten',
  ],
  snow_blade: [
    'Rabaud',
    'Pronard',
    'Hydromann',
  ],
  drones: [
    'DJI',
    'XAG',
    'Parrot',
  ],
  truck: [
    'Volvo',
    'Mercedes',
    'Scania',
    'Renault trucks',
  ],
  pickup: [
    'Mercedes',
    'Renault',
    'Toyota',
  ]
};

const images = {
  quads: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/quad-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/quad-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/quad-3.png'
  ],
  nacelles: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/nacelles-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/nacelles-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/nacelles-3.png',
  ],
  sweeper: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/swipper-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/swipper-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/swipper-3.png',
  ],
  snow_blade: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/snow-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/snow-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/snow-3.png',
  ],
  drones: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/drone-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/drone-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/drone-3.png',
  ],
  truck: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/truck-1.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/truck-2.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/truck-3.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/truck-4.png',
  ],
  pickup: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/pikup-merco.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/pikup-renault.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/various/pikup-toyota.png',
    
  ]
};

export const ENGINE_LIST_VARIOUS_EQUIPMENT_QUADS = generateEngineList(modelname['quads'], brandname['quads'], 3, 'Quads', images['quads']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_NACELLES = generateEngineList(modelname['nacelles'], brandname['nacelles'], 3, 'Nacelles élévatrices', images['nacelles']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_SWEEPER = generateEngineList(modelname['sweeper'], brandname['sweeper'], 3, 'Balayeuses', images['sweeper']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_SNOW_BLADE= generateEngineList(modelname['snow_blade'], brandname['snow_blade'], 3, 'Lames de déneigement', images['snow_blade']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_DRONES = generateEngineList(modelname['drones'], brandname['drones'], 3, 'Drones', images['drones']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_TRUCK = generateEngineList(modelname['truck'], brandname['truck'], 4, 'Camions', images['truck']);
export const ENGINE_LIST_VARIOUS_EQUIPMENT_PICKUP = generateEngineList(modelname['pickup'], brandname['pickup'], 3, 'Pick-up', images['pickup']);