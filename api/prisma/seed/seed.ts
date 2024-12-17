import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import { ENGINE_LIST } from './engine';
import { ENGINE_TYPE } from './1-engineType';

const prisma = new PrismaClient();

interface EngineInput {
  modelName: string;
  brandName: string;
  conception: string;
  engineKwPower: number;
  engineCcPower: number;
  maxKmhSpeed: number;
  petrolLitreTank: number;
  tankLitre: number;
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
          console.info('[SEED] Successfully created engine type records');
          return true;
        } catch (e) {
          console.error('[SEED] Failed to create engine type records', e);
          return false; 
        }
      };


      const seedEngine = async (): Promise<void> => {
        try {
          await Promise.all(
            ENGINE_LIST.map(async (n: EngineInput) =>
              prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  maxKmhSpeed: n.maxKmhSpeed,
                  petrolLitreTank: n.petrolLitreTank,
                  tankLitre: n.tankLitre,
                  weightKg: n.weightKg,
                  workingWidth: n.workingWidth,
                  copiesNumber: n.copiesNumber,
                  typeId: n.typeId,
                  imageUrl: n.imageUrl,  
                },
              }),
            ),
          );
          console.info('[SEED] Successfully created engine records');
        } catch (e) {
          console.error('[SEED] Failed to create engine records', e);
        }
      };
      const isTypeSeeded = await seedType();
      if (isTypeSeeded) {
        await seedEngine();
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
