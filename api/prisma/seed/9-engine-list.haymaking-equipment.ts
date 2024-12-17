import { faker } from '@faker-js/faker';

const generateHaymakingEquipmentListSeeder = () => ({
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
  imageUrl: 'https://nestjsfileuploadfarmingmachine.s3.eu-west-3.amazonaws.com/enrubanneuse.png',
});

export const ENGINE_LIST_HAYMAKING_EQUIPMENT = Array.from({ length: 10 }, () =>
  generateHaymakingEquipmentListSeeder()
);
