import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import { ENGINE_TYPE } from './1-engineType';
import { ENGINE_LIST_CRUSHERS } from './2-engine-list.crushers';
import { ENGINE_LIST_VARIOUS_EQUIPMENT } from './3-engine-list.various-equipment';
import { ENGINE_LIST_SPREADING } from './4-engine-list.spreading';
import { ENGINE_LIST_HANDLING } from './5-engine-list.handling';
import { ENGINE_LIST_SPECIALIZED_CULTURE } from './6-engine-list.specialized-cultures';
import { ENGINE_LIST_HARVEST_EQUIPMENT } from './10-engine-list.harvest-equipment';
import { ENGINE_LIST_SEEDERS_EQUIPMENT } from './14-engine-list.seeders-equipment';
import { ENGINE_LIST_TRACTORS } from './15-engine-list.tractors';

const prisma = new PrismaClient();

interface EngineInput {
  modelName: string;
  brandName: string;
  description: string,
  ref: string,
  conception: string;
  engineKwPower: number;
  engineCcPower: number;
  maxKmhSpeed: number;
  petrolLitreTank: number;
  tankLitre: number;
  autonomyMn: number,    
  liftingHeightMeter: number,
  weightKg: number;
  workingWidth: number;
  copiesNumber: number;
  typeId: number;
  imageUrl: string;
}


interface TypeInput {
  name: string;
  description: string;
}

interface ParsedArgs {
  values: {
    environment?: string;
  };
}

const main = async (): Promise<void> => {
  const {
    values: { environment },
  } = parseArgs({
    options: {
      environment: {
        type: 'string',
      },
    },
  }) as ParsedArgs;

  switch (environment) {
    case 'development':
      const seedType = async (): Promise<boolean> => {
        try {
          await Promise.all(
            ENGINE_TYPE.map(async (n: TypeInput) =>
              prisma.engineTypes.create({
                data: {
                  name: n.name,
                  description: n.description,
          
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created engine types records');
          return true;
        } catch (e) {
          console.error('[SEED] Failed to create engine types records', e);
          return false; 
        }
      };

      const getEngineTypeIdByName = async (typeName: string): Promise<number | null> => {
        try {
          const engineType = await prisma.engineTypes.findFirst({
            where: {
              name: typeName,
            },
            select: {
              id: true,
            },
          });
          return engineType?.id || null; // Retourne l'ID ou null si non trouvé
        } catch (e) {
          console.error(`[SEED] Failed to fetch engine type ID for name "${typeName}"`, e);
          return null;
        }
      };

      const seedCrushersList = async (): Promise<void> => {
        try {
          const typeName = "broyeurs épareuses"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_CRUSHERS.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created crushers equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create crushers equipment records', e);
        }
      };

      const seedVariousEquipmentList = async (): Promise<void> => {
        try {
          const typeName = "équipements divers"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_VARIOUS_EQUIPMENT.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created various equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create various equipment records', e);
        }
      };

      const seedSpreadingList = async (): Promise<void> => {
        try {
          const typeName = "épandage"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_SPREADING.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created spreading equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create spreading equipment records', e);
        }
      };

      const seedHandlingList = async (): Promise<void> => {
        try {
          const typeName = "manutention"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_HANDLING.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created handling equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create handling equipment records', e);
        }
      };

      const seedSpecializedCulturesList = async (): Promise<void> => {
        try {
          const typeName = "matériels de cultures spécialisés"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_SPECIALIZED_CULTURE.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create specialized cultures equipment records', e);
        }
      };

      const seedHarvestList = async (): Promise<void> => {
        try {
          const typeName = "matériels de récolte"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_HARVEST_EQUIPMENT.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: n.typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created harvest equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create harvest equipment records', e);
        }
      };

      const seedSeedersEquipmentList = async (): Promise<void> => {
        try {
          const typeName = "semoirs"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_SEEDERS_EQUIPMENT.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create seeders equipment records', e);
        }
      };

      const seedTractorsList = async (): Promise<void> => {
        try {
          const typeName = "tracteurs"; // Remplace par le nom souhaité
          const typeId = await getEngineTypeIdByName(typeName);
      
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping tractors seeding`);
            return;
          }
          await Promise.all(
            ENGINE_LIST_TRACTORS.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  description: n.description,
                  ref: n.ref,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  autonomyMn: n.autonomyMn,    
                  liftingHeightMeter: n.autonomyMn,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created tractors equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create tractors equipment records', e);
        }
      };

   
 
      const isTypeSeeded = await seedType();
      if (isTypeSeeded) {
        await seedCrushersList();
        await seedVariousEquipmentList();
        await seedHandlingList();
        await seedSpreadingList();
        await seedSpecializedCulturesList();
        await seedHarvestList();
        await seedSeedersEquipmentList();
        await seedTractorsList();
      } else {
        console.warn('[SEED] Skipping engine seeding due to type seeding failure');
      }
      break;

    case 'test':
      break;

    default:
      break;
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
