import { faker } from '@faker-js/faker';

export const generateFakerData = (modelname: string[], brandname: string[], index: number, reference: string, image:string[]) => ({
  modelName: modelname[index % brandname.length],
  brandName: brandname[index % brandname.length],
  description: faker.commerce.productDescription(),
  ref: reference,
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
  engineModelId: null,
  imageUrl: image[index % image.length],
});

export const generateEngineList = (modelname: string[], brandname: string[], count: number, reference: string, imageSet: string[]) => {
  return Array.from({ length: count }, (_, index) => generateFakerData(modelname, brandname, index, reference, imageSet));
}
