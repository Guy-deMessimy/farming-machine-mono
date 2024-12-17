import { faker } from '@faker-js/faker';

const generateFakerData = (index: number, image:string[]) => ({
  modelName: faker.vehicle.model(),
  brandName: faker.vehicle.manufacturer(),
  description: faker.commerce.productDescription(),
  ref: faker.string.alphanumeric(10),
  conception: faker.vehicle.fuel(),
  engineKwPower: faker.number.int({ min: 50, max: 500 }),
  engineCcPower: faker.number.int({ min: 1000, max: 8000 }),
  maxKmhSpeed: faker.number.int({ min: 15, max: 45 }),
  petrolLitreTank: faker.number.int({ min: 10, max: 200 }), 
  tankLitre: faker.number.int({ min: 50, max: 1000 }),
  autonomyMn: faker.number.int({ min: 1, max: 20 }), 
  liftingHeightMeter: faker.number.int({ min: 1, max: 20 }),
  weightKg: faker.number.int({ min: 500, max: 10000 }),
  workingWidth: faker.number.int({ min: 1, max: 20 }),
  copiesNumber: faker.number.int({ min: 1, max: 5 }),
  typeId: null,
  imageUrl: image[index % image.length],
});

const images = {
  crushers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/broyeuse.png',
  ],
  handling: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/chargeur-frontal.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/leve-palette.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/chargeur-frontal-2.png'
  ],
  various_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/drone.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/drone.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/quad.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/quad.png',
  ],
  spreading: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/epandeur.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/epandeur.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/epandeur.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/epandeur.png',
  ],
  specialized_culture: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/arracheuse-betterave.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/arracheuse-betterave.png',
  ],
  breeding_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/desileuse.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/desileuse.png',
  ],
  irrigation_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/pompe.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/pompe.png',
  ],
  haymaking_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/enrubanneuse.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/enrubanneuse.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/enrubanneuse.png'
  ],
  soi_tools: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/outils-sols.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/outils-sols.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/outils-sols.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/outils-sols.png',
  ],
  sprayer_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/pulverisateur.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/pulverisateur.png',
  ],
  agricultural_trailers: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/remorques.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/remorques.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/remorques.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/remorques.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/remorques.png',
  ],
  seeders_equipment: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/semoirs.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/semoirs.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/semoirs.png',
  ],
  tractors: [
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
    'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Claas.png',
  ]
};

export const generateEngineList = (type: string, count: number) => {
  const imageSet = images[type];
  return Array.from({ length: count }, (_, index) => generateFakerData(index, imageSet));
}

export const ENGINE_LIST_CRUSHERS = generateEngineList('crushers', 3);
export const ENGINE_LIST_HANDLING = generateEngineList('handling', 3);
export const ENGINE_LIST_VARIOUS_EQUIPMENT = generateEngineList('various_equipment', 4);
export const ENGINE_LIST_SPREADING = generateEngineList('spreading', 4);
export const ENGINE_LIST_SPECIALIZED_CULTURE = generateEngineList('specialized_culture', 2);
export const ENGINE_LIST_BREEDING_EQUIPMENT = generateEngineList('breeding_equipment', 2);
export const ENGINE_LIST_IRRIGATION_EQUIPMENT = generateEngineList('irrigation_equipment', 2);
export const ENGINE_LIST_HAYMAKING_EQUIPMENT = generateEngineList('haymaking_equipment', 3);
export const ENGINE_LIST_SOI_TOOLS = generateEngineList('soi_tools', 4);
export const ENGINE_LIST_SPRAYER_EQUIPMENT = generateEngineList('sprayer_equipment', 2);
export const ENGINE_LIST_AGRICULTURAL_TRAILERS = generateEngineList('agricultural_trailers', 5);
export const ENGINE_LIST_SEEDERS_EQUIPMENT = generateEngineList('seeders_equipment', 3);
export const ENGINE_LIST_TRACTORS = generateEngineList('tractors', 6);

export const ENGINE_LIST_HARVEST_EQUIPMENT  = [
  {
    modelName: 'Axial-flow 4000',
    brandName: 'Case IH',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Cylindre Axial',
    engineKwPower: 210,
    engineCcPower: 180,
    maxKmhSpeed: 30,
    petrolLitreTank: 500,
    tankLitre: 600,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 6000,
    workingWidth: 14,
    copiesNumber: 2,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/New-Holland.png'
  },
  {
    modelName: 'Lexion 8900',
    brandName: 'Claas',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Hybride',
    engineKwPower: 485,
    engineCcPower: 460,
    maxKmhSpeed: 40,
    petrolLitreTank: 1150,
    tankLitre: 18000,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 18700,
    workingWidth: 13.8,
    copiesNumber: 1,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Massey-Ferguson.png',
  },
  {
    modelName: 'S790',
    brandName: 'John Deere',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Conventionnelle',
    engineKwPower: 460,
    engineCcPower: 435,
    maxKmhSpeed: 40,
    petrolLitreTank: 1250,
    tankLitre: 14100,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 19000,
    workingWidth: 12.2,
    copiesNumber: 2,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Ks-Agrotech.png',
  },
  {
    modelName: 'Ideal 9T',
    brandName: 'Fendt',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Rotor Unique',
    engineKwPower: 483,
    engineCcPower: 455,
    maxKmhSpeed: 40,
    petrolLitreTank: 1500,
    tankLitre: 17100,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 21000,
    workingWidth: 12.2,
    copiesNumber: 1,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/John-Deere.png'
  },
  {
    modelName: 'CR10.90',
    brandName: 'New Holland',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Twin Rotor',
    engineKwPower: 515,
    engineCcPower: 490,
    maxKmhSpeed: 30,
    petrolLitreTank: 1300,
    tankLitre: 14500,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 24500,
    workingWidth: 13.7,
    copiesNumber: 1,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/John-Deere-2.png',
  },
  {
    modelName: 'Trion 750',
    brandName: 'Claas',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Hybride',
    engineKwPower: 320,
    engineCcPower: 300,
    maxKmhSpeed: 30,
    petrolLitreTank: 800,
    tankLitre: 12000,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 15000,
    workingWidth: 9.3,
    copiesNumber: 3,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/New-Holland.png'
  },
  {
    modelName: 'Tucano 580',
    brandName: 'Claas',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Conventionnelle',
    engineKwPower: 280,
    engineCcPower: 260,
    maxKmhSpeed: 25,
    petrolLitreTank: 650,
    tankLitre: 10000,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 13500,
    workingWidth: 7.7,
    copiesNumber: 2,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Massey-Ferguson.png',
  },
  {
    modelName: 'TC5.90',
    brandName: 'New Holland',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Conventionnelle',
    engineKwPower: 220,
    engineCcPower: 200,
    maxKmhSpeed: 30,
    petrolLitreTank: 400,
    tankLitre: 6400,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 10500,
    workingWidth: 6.1,
    copiesNumber: 4,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/Ks-Agrotech.png',
  },
  {
    modelName: 'Deutz-Fahr 6095 HTS',
    brandName: 'Deutz-Fahr',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Conventionnelle',
    engineKwPower: 260,
    engineCcPower: 240,
    maxKmhSpeed: 30,
    petrolLitreTank: 500,
    tankLitre: 8500,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 11500,
    workingWidth: 7.2,
    copiesNumber: 2,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/New-Holland.png'
  },
  {
    modelName: 'MF Activa 7347 S',
    brandName: 'Massey Ferguson',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Conventionnelle',
    engineKwPower: 235,
    engineCcPower: 220,
    maxKmhSpeed: 25,
    petrolLitreTank: 450,
    tankLitre: 8600,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 11000,
    workingWidth: 7.6,
    copiesNumber: 3,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/John-Deere.png'
  },
  {
    modelName: 'Rostselmash TORUM 785',
    brandName: 'Rostselmash',
    description: 'Pour moissoneuse-batteuse',
    ref: 'moissoneuse',
    conception: 'Rotor Unique',
    engineKwPower: 390,
    engineCcPower: 370,
    maxKmhSpeed: 27,
    petrolLitreTank: 850,
    tankLitre: 12000,
    autonomyMn: null,
    liftingHeightMeter: null,
    weightKg: 17800,
    workingWidth: 9.9,
    copiesNumber: 1,
    typeId: 10,
    imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/John-Deere-2.png',
  },
];




