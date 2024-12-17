import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
// Types
import { EngineInput, ParsedArgs, TypeInput } from './types/engines.type';
// Dummy data lists
import { ENGINE_TYPE } from './1-engineType';
import { ENGINE_LIST_CRUSHERS } from './2-engine-list.crushers';
import { ENGINE_LIST_VARIOUS_EQUIPMENT } from './3-engine-list.various-equipment';
import { ENGINE_LIST_SPREADING } from './4-engine-list.spreading';
import { ENGINE_LIST_HANDLING } from './5-engine-list.handling';
import { ENGINE_LIST_SPECIALIZED_CULTURE } from './6-engine-list.specialized-cultures';
import { ENGINE_LIST_BREEDING_EQUIPMENT } from './7-engine-list.breeding-equipment';
import { ENGINE_LIST_IRRIGATION_EQUIPMENT } from './8-engine-list.irrigation-equipment';
import { ENGINE_LIST_HAYMAKING_EQUIPMENT } from './9-engine-list.haymaking-equipment';
import { ENGINE_LIST_HARVEST_EQUIPMENT } from './10-engine-list.harvest-equipment';
import { ENGINE_LIST_SOI_TOOLS } from './11-engine-list.soil-tools';
import { ENGINE_LIST_SPRAYER_EQUIPMENT } from './12-engine-list.sprayer-equipment';
import { ENGINE_LIST_AGRICULTURAL_TRAILERS } from './13-engine-list.agricultural-trailers';
import { ENGINE_LIST_SEEDERS_EQUIPMENT } from './14-engine-list.seeders-equipment';
import { ENGINE_LIST_TRACTORS } from './15-engine-list.tractors';

const prisma = new PrismaClient();

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

      const createEngineRecords = async (typeName: string, engineList: EngineInput[]): Promise<void> => {
        try {
          const typeId = await getEngineTypeIdByName(typeName);
        
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping seeding`);
            return;
          }
      
          await Promise.all(
            engineList.map(async (engine: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: engine.modelName,
                  brandName: engine.brandName,
                  description: engine.description,
                  ref: engine.ref,
                  conception: engine.conception,
                  engineKwPower: engine.engineKwPower,
                  engineCcPower: engine.engineCcPower,
                  maxKmhSpeed: engine.maxKmhSpeed,
                  petrolLitreTank: engine.petrolLitreTank,
                  tankLitre: engine.tankLitre,
                  autonomyMn: engine.autonomyMn,    
                  liftingHeightMeter: engine.autonomyMn,
                  weightKg: engine.weightKg,
                  workingWidth: engine.workingWidth,
                  copiesNumber: engine.copiesNumber,
                  typeId: typeId,
                  imageUrl: engine.imageUrl,  
                },
              }),
            ),
          );
          console.info(`[SEED] Successfully created ${typeName} records`);
        } catch (e) {
          console.error(`[SEED] Failed to create ${typeName} records`, e);
        }
      };

      const seedCrushersList = async (): Promise<void> => {
        try {
          await createEngineRecords("broyeurs épareuses", ENGINE_LIST_CRUSHERS);
          console.info('[SEED] Successfully created crushers equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create crushers equipment records', e);
        }
      };

      const seedVariousEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("équipements divers", ENGINE_LIST_VARIOUS_EQUIPMENT);
          console.info('[SEED] Successfully created various equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create various equipment records', e);
        }
      };

      const seedSpreadingList = async (): Promise<void> => {
        try {
          await createEngineRecords("épandage", ENGINE_LIST_SPREADING);
          console.info('[SEED] Successfully created spreading equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create spreading equipment records', e);
        }
      };

      const seedHandlingList = async (): Promise<void> => {
        try {
          await createEngineRecords("manutention", ENGINE_LIST_HANDLING);
          console.info('[SEED] Successfully created handling equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create handling equipment records', e);
        }
      };

      const seedSpecializedCulturesList = async (): Promise<void> => {
        try {
          await createEngineRecords("matériels de cultures spécialisés", ENGINE_LIST_SPECIALIZED_CULTURE);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create specialized cultures equipment records', e);
        }
      };

      const seedBreedingEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("matériels élevage", ENGINE_LIST_BREEDING_EQUIPMENT);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create breeding equipment records', e);
        }
      };

      const seedIrrigationEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("matériels irrigation", ENGINE_LIST_IRRIGATION_EQUIPMENT);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create irrigation equipment records', e);
        }
      };

      const seedHaymakingEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("matériels de fenaison", ENGINE_LIST_HAYMAKING_EQUIPMENT);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create haymaking equipment records', e);
        }
      };

      const seedHarvestList = async (): Promise<void> => {
        try {
          await createEngineRecords("matériels de récolte", ENGINE_LIST_HARVEST_EQUIPMENT);
          console.info('[SEED] Successfully created harvest equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create harvest equipment records', e);
        }
      };

      const seedSoiToolsList = async (): Promise<void> => {
        try {
          await createEngineRecords("outils de sols", ENGINE_LIST_SOI_TOOLS);
          console.info('[SEED] Successfully created harvest equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create soi tools equipment records', e);
        }
      };

      const seedSprayerEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("pulvérisateurs", ENGINE_LIST_SPRAYER_EQUIPMENT);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create sprayer equipment records', e);
        }
      };

      const seedSeedersAgriculturalTrailersList = async (): Promise<void> => {
        try {
          await createEngineRecords("remorques agricoles", ENGINE_LIST_AGRICULTURAL_TRAILERS);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create agricultural trailers equipment records', e);
        }
      };

      const seedSeedersEquipmentList = async (): Promise<void> => {
        try {
          await createEngineRecords("semoirs", ENGINE_LIST_SEEDERS_EQUIPMENT);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create seeders equipment records', e);
        }
      };

      const seedTractorsList = async (): Promise<void> => {
        try {
          await createEngineRecords("tracteurs", ENGINE_LIST_TRACTORS);
          console.info('[SEED] Successfully created tractors equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create tractors equipment records', e);
        }
      };

   
      const isTypeSeeded = await seedType();
      if (isTypeSeeded) {
        await Promise.all([
          seedCrushersList(),
          seedVariousEquipmentList(),
          seedHandlingList(),
          seedSpreadingList(),
          seedSpecializedCulturesList(),
          seedBreedingEquipmentList(),
          seedIrrigationEquipmentList(),
          seedHaymakingEquipmentList(),
          seedHarvestList(),
          seedSoiToolsList(),
          seedSprayerEquipmentList(),
          seedSeedersAgriculturalTrailersList(),
          seedSeedersEquipmentList(),
          seedTractorsList()
        ]);
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
