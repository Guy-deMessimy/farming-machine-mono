import { PrismaClient, RoleName } from '@prisma/client';
import { parseArgs } from 'node:util';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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
  ENGINE_MODEL_LIST_SEEDERS_EQUIPMENT,
  ENGINE_MODEL_LIST_SOI_TOOLS,
  ENGINE_MODEL_LIST_SPECIALIZED_CULTURE,
  ENGINE_MODEL_LIST_SPRAYER_EQUIPMENT,
  ENGINE_MODEL_LIST_SPREADING,
  ENGINE_MODEL_LIST_TRACTORS,
  ENGINE_MODEL_LIST_VARIOUS_EQUIPMENT
} from './2-populate-engine-models';
import {
  ENGINE_LIST_CRUSHERS_REAPER,
  ENGINE_LIST_CRUSHERS_TRIMMERS
} from './4-engine-list-crushers';
import {
  ENGINE_LIST_VARIOUS_EQUIPMENT_DRONES,
  ENGINE_LIST_VARIOUS_EQUIPMENT_NACELLES,
  ENGINE_LIST_VARIOUS_EQUIPMENT_PICKUP,
  ENGINE_LIST_VARIOUS_EQUIPMENT_QUADS,
  ENGINE_LIST_VARIOUS_EQUIPMENT_SNOW_BLADE,
  ENGINE_LIST_VARIOUS_EQUIPMENT_SWEEPER,
  ENGINE_LIST_VARIOUS_EQUIPMENT_TRUCK
} from './5-engine-list-various-equipment';
import {
  ENGINE_LIST_SPREADING_BURYER,
  ENGINE_LIST_SPREADING_SLURRY_TON,
  ENGINE_LIST_SPREADING_SPREADER
} from './6-engine-list-spreading';

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
} from './10-engine-list-haymaking-equipment';

import {
  ENGINE_LIST_HARVEST_COMBINE_HARVESTER,
  ENGINE_LIST_HARVEST_FORAGE_HARVESTER,
  ENGINE_LIST_HARVEST_PICKER
} from './11-engine-list-harvest';
import {
  ENGINE_LIST_SOI_TOOLS_DETHATCHER,
  ENGINE_LIST_SOI_TOOLS_GROWERS,
  ENGINE_LIST_SOI_TOOLS_HARROWS,
  ENGINE_LIST_SOI_TOOLS_TRIMMERS
} from './12-engine-list-soi-tools';

import {
  ENGINE_LIST_SPRAYER_EQUIPMENT,
  ENGINE_LIST_SPRAYER_EQUIPMENT_ATOMIZER,
  ENGINE_LIST_SPRAYER_WINDER
} from './13-engine-list-sprayer-equipment';
import {
  ENGINE_LIST_AGRICULTURAL_TRAILERS,
  ENGINE_LIST_AGRICULTURAL_TRAILERS_FERRY,
  ENGINE_LIST_AGRICULTURAL_TRAILERS_FORAGE_TRAY
} from './14-engine-list-agricultural-trailers';
import {
  ENGINE_LIST_SEEDERS_EQUIPMENT_CEREALS,
  ENGINE_LIST_WOOD_TRACTORS_SINGLE_SEEDS
} from './15-engine-list-seeders-equipment';
import {
  ENGINE_LIST_TRACTORS,
  ENGINE_LIST_WOOD_TRACTORS
} from './16-engine-list-tractors';
import { generateFakeUsers } from './17-populate-users';
import { PermissionName } from './enums/permissions.enum';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateApiKey = (id: number, uuid: string): string => {
  const raw = `${id} ${uuid}`;
  return Buffer.from(raw).toString('base64');

}

const createAndHash = async (visibleKey: string,): Promise<{ visibleKey: string; hashedKey: string }> => {
  const hashedKey = await bcrypt.hash(visibleKey, 10);     
  return { visibleKey, hashedKey };
};


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

      const seedCrushersList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("broyeurs épareuses", ENGINE_MODEL_LIST_CRUSHERS);
          await createEngineRecords("Faucheurs", ENGINE_LIST_CRUSHERS_REAPER);
          await createEngineRecords("Epareuses", ENGINE_LIST_CRUSHERS_TRIMMERS);
          console.info('[SEED] Successfully created crushers equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create crushers equipment records', e);
        }
      };

      const seedVariousEquipmentList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("équipements divers", ENGINE_MODEL_LIST_VARIOUS_EQUIPMENT);
          await createEngineRecords("Quads", ENGINE_LIST_VARIOUS_EQUIPMENT_QUADS);
          await createEngineRecords("nacelles élévatrices", ENGINE_LIST_VARIOUS_EQUIPMENT_NACELLES);
          await createEngineRecords("Balayeuses", ENGINE_LIST_VARIOUS_EQUIPMENT_SWEEPER);
          await createEngineRecords("Lames de déneigement", ENGINE_LIST_VARIOUS_EQUIPMENT_SNOW_BLADE);
          await createEngineRecords("Drones", ENGINE_LIST_VARIOUS_EQUIPMENT_DRONES);
          await createEngineRecords("Camions", ENGINE_LIST_VARIOUS_EQUIPMENT_TRUCK);
          await createEngineRecords("Pick-up", ENGINE_LIST_VARIOUS_EQUIPMENT_PICKUP);
          console.info('[SEED] Successfully created various equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create various equipment records', e);
        }
      };

      const seedSpreadingList = async (): Promise<void> => {
        try {
          await createEngineModelRecords("épandage", ENGINE_MODEL_LIST_SPREADING);
          await createEngineRecords("Enfouisseurs", ENGINE_LIST_SPREADING_BURYER);
          await createEngineRecords("Epandeurs", ENGINE_LIST_SPREADING_SPREADER);
          await createEngineRecords("Tonne à lisier", ENGINE_LIST_SPREADING_SLURRY_TON);
          console.info('[SEED] Successfully created spreading equipment records');
        } catch (e) {
          console.error('[SEED] Failed to create spreading equipment records', e);
        }
      };

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
          await createEngineRecords("Enrouleurs", ENGINE_LIST_SPRAYER_WINDER);
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

       const seedFakeUsers = async (count = 10): Promise<boolean> => {
         const fakeUsers = generateFakeUsers(count);
         try {
            await Promise.all(
              fakeUsers.map(async (user) => {
              const hashedPassword = await bcrypt.hash(user.password, 10);
                await prisma.user.create({
                  data: {
                    email: user.email,
                    name: user.name,
                    password: hashedPassword,
                  },
                });
              })
            );
      
           console.info(`[SEED] Successfully created ${count} users`);
          return true
         } catch (error) {
           console.error('[SEED] Failed to seed users:', error);
          return false;
         }
       };
      
      const seedPermissions = async (): Promise<boolean> => {
        try {
          const permissions = Object.values(PermissionName);
          await Promise.all(
            permissions.map(async (name) => {
              await prisma.permission.upsert({
                where: { name },
                update: {},
                create: { name },
              });
            })
          );
          console.info('[SEED] Successfully created permissions');
          return true
        } catch (error) {
          console.error('[SEED] Failed to seed permissions:', error);
          return false;
        }
      };

      const seedRoles = async (): Promise<boolean> => {
        const rolePermissions: Record<string, PermissionName[]> = {
          ADMIN: [
            PermissionName.READ_MACHINE,
            PermissionName.CREATE_MACHINE,
            PermissionName.UPDATE_MACHINE,
            PermissionName.DELETE_MACHINE,
          ],
          PROVIDER: [
            PermissionName.READ_MACHINE,
            PermissionName.CREATE_MACHINE,
          ],
          VIEWER: [
            PermissionName.READ_MACHINE,
          ],
        };
        try {
          for (const roleName of Object.keys(rolePermissions) as RoleName[]) {
            const permissions = rolePermissions[roleName];
            const existingPermissions = await prisma.permission.findMany({
              where: { name: { in: permissions } },
            });
            await prisma.role.upsert({
              where: { name: roleName },
              update: {},
              create: {
                name: roleName,
                permissions: {
                  connect: existingPermissions.map((p) => ({ id: p.id })),
                },
              },
            });
          }
          console.info(`[SEED] Successfully created roles with permissions`);
          return true
        } catch (error) {
          console.error('[SEED] Failed to seed role:', error);
          return false;
        }
      };

      const seedApiKeys = async (): Promise<void> => {
        const users = await prisma.user.findMany();
        const permissions = await prisma.permission.findMany();

        if (!users || !permissions) {
          throw new Error('No users or permissions found - seed them first')
        }
        for (const user of users) {
          const numberOfKeys = faker.number.int({ min: 1, max: 3 })
          for (let i = 0; i < numberOfKeys; i++) {
            const uuid = crypto.randomUUID();
            const selectedPermissions = faker.helpers.arrayElements(permissions, faker.number.int({ min: 1, max: Math.min(permissions.length, 4) }));
            const created = await prisma.apiKey.create({
              data: {
                uuid,
                key: 'placeholder', 
                label: `seed-key-${i}`,
                expiresAt: faker.date.future(),
                isActive: true,
                owner: { connect: { id: user.id } },
                permissions: {
                  connect: selectedPermissions.map((p) => ({ id: p.id })),
                },
              },
            });

            const visibleKey = generateApiKey(created.id, uuid);
            const { hashedKey } = await createAndHash(visibleKey);
            await prisma.apiKey.update({
              where: { id: created.id },
              data: { key: hashedKey },
            });
            console.log(`[SEED] API Key for ${user.email}: ${visibleKey}`);
          }
        }
          console.info(`[SEED] Successfully created apiKeys`);
      }

      const isTypeSeeded = await seedEngineTypes();

      if (isTypeSeeded) {
        const isPermissions = await seedPermissions();
        const isUsers = await seedFakeUsers(20);
        const isRoles = await seedRoles(); // dépend des permissions
        if (isPermissions && isUsers && isRoles) {
          await Promise.all([
            seedCrushersList(),
            seedVariousEquipmentList(),
            seedHandlingList(),
            seedSpreadingList(),
            seedSpecializedCulturesList(),
            seedBreedingEquipmentList(),
            seedHaymakingEquipmentList(),
            seedHarvestList(),
            seedSoiToolsList(),
            seedSprayerEquipmentList(),
            seedSeedersAgriculturalTrailersList(),
            seedSeedersEquipmentList(),
            seedTractorsList(),
            seedApiKeys(),
          ]);
        } else {
          console.warn('[SEED] Critical seeding step failed (users, permissions or roles). Skipping equipment.');
        }
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
