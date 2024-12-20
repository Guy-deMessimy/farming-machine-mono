import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
// Types
import { EngineInput, EngineModelInput, ParsedArgs, TypeInput } from './types/engines.type';
// Dummy data lists
import { ENGINE_TYPE } from './1-populate-engine-types';
import {
  ENGINE_MODEL_LIST_AGRICULTURAL_TRAILERS,
  ENGINE_MODEL_LIST_BREEDING_EQUIPMENT,
  ENGINE_MODEL_LIST_CRUSHERS,
  ENGINE_MODEL_LIST_HANDLING,
  ENGINE_MODEL_LIST_HARVEST_EQUIPMENT,
  ENGINE_MODEL_LIST_HAYMAKING_EQUIPMENT,
  ENGINE_MODEL_LIST_IRRIGATION_EQUIPMENT,
  ENGINE_MODEL_LIST_SEEDERS_EQUIPMENT,
  ENGINE_MODEL_LIST_SOI_TOOLS,
  ENGINE_MODEL_LIST_SPECIALIZED_CULTURE,
  ENGINE_MODEL_LIST_SPRAYER_EQUIPMENT,
  ENGINE_MODEL_LIST_SPREADING,
  ENGINE_MODEL_LIST_TRACTORS,
  ENGINE_MODEL_LIST_VARIOUS_EQUIPMENT
} from './2-populate-engine-models';
import {
  ENGINE_LIST_VARIOUS_EQUIPMENT_DRONES,
  ENGINE_LIST_VARIOUS_EQUIPMENT_NACELLES,
  ENGINE_LIST_VARIOUS_EQUIPMENT_QUADS,
  ENGINE_LIST_VARIOUS_EQUIPMENT_SNOW_BLADE,
  ENGINE_LIST_VARIOUS_EQUIPMENT_SWEEPER,
  ENGINE_LIST_VARIOUS_EQUIPMENT_TRUCK
} from './5-engine-list-various-equipment';
import {
  ENGINE_LIST_HANDLING_FRONT_LOADER,
  ENGINE_LIST_HANDLING_PALLET_LIFT
} from './7-engine-list-handling';
import {
  ENGINE_LIST_SPECIALIZED_CULTURE_BEET_HARVESTER,
  ENGINE_LIST_SPECIALIZED_CULTURE_POTATO_PLANTER,
  ENGINE_LIST_SPECIALIZED_CULTURE_WINDROWERS
} from './8-engine-list-specialized-culture';
import {
  ENGINE_LIST_BREEDING_EQUIPMENT_CATTLEWOMAN,
  ENGINE_LIST_BREEDING_EQUIPMENT_MIXER,
  ENGINE_LIST_BREEDING_EQUIPMENT_STRAW_BLOWER,
  ENGINE_LIST_BREEDING_EQUIPMENT_WATER_BARREL
} from './9-engine-list-breeding-equipment';
import {
  ENGINE_LIST_HAYMAKING_EQUIPMENT_BALER_PRESS,
  ENGINE_LIST_HAYMAKING_EQUIPMENT_TEDDER,
  ENGINE_LIST_HAYMAKING_EQUIPMENT_WRAPPER
} from './11-engine-list-haymaking-equipment';

import {
  ENGINE_LIST_HARVEST_COMBINE_HARVESTER,
  ENGINE_LIST_HARVEST_FORAGE_HARVESTER,
  ENGINE_LIST_HARVEST_PICKER
} from './12-engine-list-harvest';
import {
  ENGINE_LIST_SOI_TOOLS_DETHATCHER,
  ENGINE_LIST_SOI_TOOLS_GROWERS,
  ENGINE_LIST_SOI_TOOLS_HARROWS,
  ENGINE_LIST_SOI_TOOLS_TRIMMERS
} from './13-engine-list-soi-tools';

import {
  ENGINE_LIST_SPRAYER_EQUIPMENT,
  ENGINE_LIST_SPRAYER_EQUIPMENT_ATOMIZER
} from './14-engine-list-sprayer-equipment';
import {
  ENGINE_LIST_AGRICULTURAL_TRAILERS,
  ENGINE_LIST_AGRICULTURAL_TRAILERS_FERRY,
  ENGINE_LIST_AGRICULTURAL_TRAILERS_FORAGE_TRAY
} from './15-engine-list-agricultural-trailers';
import {
  ENGINE_LIST_SEEDERS_EQUIPMENT_CEREALS,
  ENGINE_LIST_WOOD_TRACTORS_SINGLE_SEEDS
} from './16-engine-list-seeders-equipment';
import {
  ENGINE_LIST_TRACTORS,
  ENGINE_LIST_WOOD_TRACTORS
} from './17-engine-list-tractors';

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
      const seedEngineTypes = async (): Promise<boolean> => {
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

      const getEngineModelIdByName = async (typeName: string): Promise<number | null> => {
        try {
          const engineModel = await prisma.engineModel.findFirst({
            where: {
              name: typeName,
            },
            select: {
              id: true,
            },
          });
          return engineModel?.id || null; // Retourne l'ID ou null si non trouvé
        } catch (e) {
          console.error(`[SEED] Failed to fetch engine model ID for name "${typeName}"`, e);
          return null;
        }
      };

      const createEngineModelRecords = async (typeName: string, engineList: EngineModelInput[]): Promise<boolean> => {
        try {

          const typeId = await getEngineTypeIdByName(typeName);
        
          if (!typeId) {
            console.warn(`[SEED] Engine type "${typeName}" not found, skipping seeding`);
            return;
          }
          await Promise.all(
            engineList.map(async (n: TypeInput) =>
              prisma.engineModel.create({
                data: {
                  name: n.name,
                  description: n.description,
                  engineTypeId: typeId,
          
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created engine models records');
          return true;
        } catch (e) {
          console.error('[SEED] Failed to create engine models records', e);
          return false; 
        }
      };

      const createEngineRecords = async (typeName: string, engineList: EngineInput[]): Promise<void> => {
        try {
          const typeId = await getEngineModelIdByName(typeName);
        
          if (!typeId) {
            console.warn(`[SEED] Engine model "${typeName}" not found, skipping seeding`);
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
                  engineModelId: typeId,
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

      // const seedCrushersList = async (): Promise<void> => {
      //   try {
      //     await createEngineModelRecords("broyeurs épareuses", ENGINE_MODEL_LIST_CRUSHERS);
      //     await createEngineRecords("Broyeuses", ENGINE_LIST_CRUSHERS);
      //     console.info('[SEED] Successfully created crushers equipment records');
      //   } catch (e) {
      //     console.error('[SEED] Failed to create crushers equipment records', e);
      //   }
      // };

      const seedVariousEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("équipements divers", ENGINE_MODEL_LIST_VARIOUS_EQUIPMENT);
          await createEngineRecords("Quads", ENGINE_LIST_VARIOUS_EQUIPMENT_QUADS);
          await createEngineRecords("nacelles élévatrices", ENGINE_LIST_VARIOUS_EQUIPMENT_NACELLES);
          await createEngineRecords("Balayeuses", ENGINE_LIST_VARIOUS_EQUIPMENT_SWEEPER);
          await createEngineRecords("Lames de déneigement", ENGINE_LIST_VARIOUS_EQUIPMENT_SNOW_BLADE);
          await createEngineRecords("Drones", ENGINE_LIST_VARIOUS_EQUIPMENT_DRONES);
          await createEngineRecords("Camions", ENGINE_LIST_VARIOUS_EQUIPMENT_TRUCK);
          console.info('[SEED] Successfully created various equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create various equipment records', e);
        }
      };

      // const seedSpreadingList = async (): Promise<void> => {
      //   try {
      //     await createEngineModelRecords("épandage", ENGINE_MODEL_LIST_SPREADING);
      //     await createEngineRecords("Epandeurs", ENGINE_LIST_SPREADING);
      //     console.info('[SEED] Successfully created spreading equipment records');
      //   } catch (e) {
      //     console.error('[SEED] Failed to create spreading equipment records', e);
      //   }
      // };

      const seedHandlingList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("manutention", ENGINE_MODEL_LIST_HANDLING);
          await createEngineRecords("Chargeur frontal", ENGINE_LIST_HANDLING_FRONT_LOADER);
          await createEngineRecords("Lèves palette", ENGINE_LIST_HANDLING_PALLET_LIFT);
          console.info('[SEED] Successfully created handling equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create handling equipment records', e);
        }
      };

      const seedSpecializedCulturesList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("matériels de cultures spécialisés", ENGINE_MODEL_LIST_SPECIALIZED_CULTURE);
          await createEngineRecords("Andaineurs", ENGINE_LIST_SPECIALIZED_CULTURE_WINDROWERS);
          await createEngineRecords("Arracheuses de betteraves", ENGINE_LIST_SPECIALIZED_CULTURE_BEET_HARVESTER);
          await createEngineRecords("Planteuses de pommes de terre", ENGINE_LIST_SPECIALIZED_CULTURE_POTATO_PLANTER);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create specialized cultures equipment records', e);
        }
      };

      const seedBreedingEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("matériels élevage", ENGINE_MODEL_LIST_BREEDING_EQUIPMENT);
          await createEngineRecords("Bétaillères", ENGINE_LIST_BREEDING_EQUIPMENT_CATTLEWOMAN);
          await createEngineRecords("Mélangeuses", ENGINE_LIST_BREEDING_EQUIPMENT_MIXER);
          await createEngineRecords("Pailleuses", ENGINE_LIST_BREEDING_EQUIPMENT_STRAW_BLOWER);
          await createEngineRecords("Tonne à eau", ENGINE_LIST_BREEDING_EQUIPMENT_WATER_BARREL);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create breeding equipment records', e);
        }
      };

      // const seedIrrigationEquipmentList = async (): Promise<void> => {
      //   try {
      //     await createEngineModelRecords("matériels irrigation", ENGINE_MODEL_LIST_IRRIGATION_EQUIPMENT);
      //     await createEngineRecords("Pompes irrigation", ENGINE_LIST_IRRIGATION_EQUIPMENT);
      //     console.info('[SEED] Successfully created specialized cultures equipment records');
      //   } catch (e) {
      //     console.error('[SEED] Failed to create irrigation equipment records', e);
      //   }
      // };

      const seedHaymakingEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("matériels de fenaison", ENGINE_MODEL_LIST_HAYMAKING_EQUIPMENT);
          await createEngineRecords("Enrubanneuses", ENGINE_LIST_HAYMAKING_EQUIPMENT_WRAPPER);
          await createEngineRecords("Faneurs", ENGINE_LIST_HAYMAKING_EQUIPMENT_TEDDER);
          await createEngineRecords("Presse à balles", ENGINE_LIST_HAYMAKING_EQUIPMENT_BALER_PRESS);
          console.info('[SEED] Successfully created specialized cultures equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create haymaking equipment records', e);
        }
      };

      const seedHarvestList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("matériels de récolte", ENGINE_MODEL_LIST_HARVEST_EQUIPMENT);
          await createEngineRecords("Moissoneuses", ENGINE_LIST_HARVEST_COMBINE_HARVESTER);
          await createEngineRecords("Ensileuses", ENGINE_LIST_HARVEST_FORAGE_HARVESTER);
          await createEngineRecords("Cueilleurs", ENGINE_LIST_HARVEST_PICKER);
          console.info('[SEED] Successfully created harvest equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create harvest equipment records', e);
        }
      };

      const seedSoiToolsList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("outils de sols", ENGINE_MODEL_LIST_SOI_TOOLS);
          await createEngineRecords("Cultivateurs", ENGINE_LIST_SOI_TOOLS_GROWERS);
          await createEngineRecords("Ecimeuses", ENGINE_LIST_SOI_TOOLS_TRIMMERS);
          await createEngineRecords("Herses", ENGINE_LIST_SOI_TOOLS_HARROWS);
          await createEngineRecords("Déchaumeur", ENGINE_LIST_SOI_TOOLS_DETHATCHER);
          console.info('[SEED] Successfully created harvest equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create soi tools equipment records', e);
        }
      };

      const seedSprayerEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("pulvérisateurs", ENGINE_MODEL_LIST_SPRAYER_EQUIPMENT);
          await createEngineRecords("Atomiseurs", ENGINE_LIST_SPRAYER_EQUIPMENT_ATOMIZER);
          await createEngineRecords("Pulvérisateurs", ENGINE_LIST_SPRAYER_EQUIPMENT);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create sprayer equipment records', e);
        }
      };

      const seedSeedersAgriculturalTrailersList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("remorques agricoles", ENGINE_MODEL_LIST_AGRICULTURAL_TRAILERS);
          await createEngineRecords("Plateau fourrager", ENGINE_LIST_AGRICULTURAL_TRAILERS_FORAGE_TRAY);
          await createEngineRecords("Remorques", ENGINE_LIST_AGRICULTURAL_TRAILERS);
          await createEngineRecords("Transbordeur", ENGINE_LIST_AGRICULTURAL_TRAILERS_FERRY);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create agricultural trailers equipment records', e);
        }
      };

      const seedSeedersEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("semoirs", ENGINE_MODEL_LIST_SEEDERS_EQUIPMENT);
          await createEngineRecords("Semoirs céréales", ENGINE_LIST_SEEDERS_EQUIPMENT_CEREALS);
          await createEngineRecords("Semoirs monograine", ENGINE_LIST_WOOD_TRACTORS_SINGLE_SEEDS);
          console.info('[SEED] Successfully created seeders equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create seeders equipment records', e);
        }
      };

      const seedTractorsList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("tracteurs", ENGINE_MODEL_LIST_TRACTORS);
          await createEngineRecords("Tracteurs agricole", ENGINE_LIST_TRACTORS);
          await createEngineRecords("tracteurs forrestier", ENGINE_LIST_WOOD_TRACTORS);
          console.info('[SEED] Successfully created tractors equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create tractors equipment records', e);
        }
      };

   
      const isTypeSeeded = await seedEngineTypes();
      if (isTypeSeeded) {
        await Promise.all([
          // seedCrushersList(),
          seedVariousEquipmentList(),
          seedHandlingList(),
          // seedSpreadingList(),
          seedSpecializedCulturesList(),
          seedBreedingEquipmentList(),
          // seedIrrigationEquipmentList(),
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
