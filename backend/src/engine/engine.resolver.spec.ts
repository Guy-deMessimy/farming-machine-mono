import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { EngineResolver } from './engine.resolver';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';

describe('EngineResolver', () => {
  let resolver: EngineResolver;
  let engineService: EngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EngineResolver,
        {
          provide: EngineService,
          useValue: {
            getEngineList: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<EngineResolver>(EngineResolver);
    engineService = module.get<EngineService>(EngineService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(engineService).toBeDefined();
  });
  it('should return an array of engines', (done) => {
    const result: Engine[] = [
      {
        id: 1,
        modelName: 'Machine test 1',
        brandName: 'Nest test',
        conception: 'Secret',
        engineKwPower: 100,
        engineCcPower: 150,
        maxKmhSpeed: 10,
        petrolLitreTank: 50,
        tankLitre: 60,
        weightKg: 600,
        workingWidth: 6,
        copiesNumber: 4,
      },
    ];

    jest.spyOn(engineService, 'getEngineList').mockReturnValue(of(result));

    resolver.getEngines({ req: { body: { query: '{}' } } } as any).subscribe({
      next: (engines) => {
        expect(engines).toEqual(result);
        done();
      },
      error: (error) => {
        done.fail(error); // Ensure done is called on error
      },
    });
  }, 10000);
});
