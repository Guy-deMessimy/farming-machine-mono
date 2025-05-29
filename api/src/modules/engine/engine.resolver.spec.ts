import { Test, TestingModule } from '@nestjs/testing';
import { EngineService } from './engine.service';
import { PubSub } from 'graphql-subscriptions';
import { EngineResolver } from './engine.resolver';

describe('EngineResolver', () => {
  let resolver: EngineResolver;
  let engineService: jest.Mocked<EngineService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EngineResolver,
        {
          provide: EngineService,
          useValue: {
            findAllEngines: jest.fn(),
          },
        },
        {
          provide: PubSub,
          useValue: {}, // Vous pouvez fournir un mock de PubSub si nécessaire
        },
      ],
    }).compile();

    resolver = module.get<EngineResolver>(EngineResolver);
    engineService = module.get(EngineService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should work with undefined query and undefined user', async () => {
    engineService.findAllEngines.mockResolvedValue([]);

    const result = await resolver.findAllEngines(undefined);

    expect(engineService.findAllEngines).toHaveBeenCalledWith(undefined);
    expect(result).toEqual([]);
  });

  describe('findAllEngines', () => {
    it('should return all engines with query and log the user', async () => {
      const query = {
        limit: 3,
      };

      const mockEngineList = [
        {
          brandName: 'Joskin',
          modelName: 'Terrasoc 6000',
          conception: 'Electric',
        },
        {
          brandName: 'Polaris',
          modelName: 'Sportsman 570 X2',
          conception: 'Diesel',
        },
        {
          brandName: 'Maschio',
          modelName: 'Bufalo 280',
          conception: 'Hybrid',
        },
      ] as any;

      engineService.findAllEngines.mockResolvedValue(mockEngineList);
      const result = await resolver.findAllEngines(query);

      expect(engineService.findAllEngines).toHaveBeenCalledWith(query);
      expect(result).toEqual(mockEngineList.slice(0, 3));
    });
  });
});
