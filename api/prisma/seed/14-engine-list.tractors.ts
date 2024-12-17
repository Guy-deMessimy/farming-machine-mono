import { faker } from '@faker-js/faker';

const generateTractorListSeeder = (typeId: number) => ({
  modelName: faker.vehicle.model(), // Génère un modèle de véhicule
  brandName: faker.vehicle.manufacturer(), // Marque de véhicule aléatoire
  description: faker.commerce.productDescription(), // Description aléatoire
  ref: faker.string.alphanumeric(10), // Référence aléatoire
  conception: faker.vehicle.fuel(),
  engineKwPower: faker.number.int({ min: 50, max: 500 }), // Puissance en kW
  engineCcPower: faker.number.int({ min: 1000, max: 8000 }), // Cylindrée en cc
  maxKmhSpeed: faker.number.int({ min: 60, max: 300 }), // Vitesse max
  petrolLitreTank: faker.number.int({ min: 10, max: 200 }), // Capacité du réservoir (essence)
  tankLitre: faker.number.int({ min: 50, max: 1000 }), // Autre capacité de réservoir
  autonomyMn: faker.number.int({ min: 1, max: 20 }), // Largeur de travail       
  liftingHeightMeter: faker.number.int({ min: 1, max: 20 }), // Largeur de travail
  weightKg: faker.number.int({ min: 500, max: 10000 }), // Poids en kg
  workingWidth: faker.number.int({ min: 1, max: 20 }), // Largeur de travail
  copiesNumber: faker.number.int({ min: 1, max: 5 }), // Nombre de copies
  typeId, // ID de type
  imageUrl: faker.image.urlLoremFlickr({ category: 'vehicles' }), // URL d'image aléatoire
});

// Générer un tableau de données
export const ENGINE_LIST_TRACTORS = Array.from({ length: 10 }, () =>
  generateTractorListSeeder(10) // Remplacer 10 par le typeId souhaité
);
