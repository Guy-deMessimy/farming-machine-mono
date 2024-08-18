import { PrismaClient } from '@prisma/client';
import { parseArgs } from 'node:util';
import { ENGINE_LIST } from './engine';

const prisma = new PrismaClient();

const main = async () => {
  const {
    values: { environment },
  } = parseArgs({
    options: {
      environment: {
        type: 'string',
      },
    },
  });

  switch (environment) {
    case 'development':
      const seedEngine = async () => {
        Promise.all(
          ENGINE_LIST.map(
            async (n) =>
              await prisma.engine.create({
                data: {
                  modelName: n.modelName,
                  brandName: n.brandName,
                  conception: n.conception,
                  engineKwPower: n.engineKwPower,
                  engineCcPower: n.engineCcPower,
                  MaxKmhSpeed: n.MaxKmhSpeed,
                  PetrolLitreTank: n.PetrolLitreTank,
                  TankLitre: n.TankLitre,
                  WeightKg: n.WeightKg,
                  WorkingWidth: n.WorkingWidth,
                  CopiesNumber: n.CopiesNumber,
                },
              }),
          ),
        )
          .then(() => console.info('[SEED] Succussfully create engine records'))
          .catch((e) =>
            console.error('[SEED] Failed to create engine records', e),
          );
      };

      seedEngine();
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
