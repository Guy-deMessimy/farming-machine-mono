import { Test, TestingModule } from '@nestjs/testing';
import { EngineService } from './engine.service';
import { EngineRepository } from './engine.repository';
import { PubSub } from 'graphql-subscriptions';

describe('EngineTypeService', () => {
  let service: EngineService;
  let repository: jest.Mocked<EngineRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EngineService,
        {
          provide: EngineRepository,
          useValue: {
            findAllEngines: jest.fn(),
          },
        },
        {
          provide: PubSub,
          useValue: {},
        },
      ],
    }).compile();

    repository = module.get(EngineRepository) as jest.Mocked<EngineRepository>;
    service = module.get(EngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllEngines', () => {
    it('should return all engines', async () => {
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

      (repository.findAllEngines as jest.Mock).mockResolvedValue(
        mockEngineList,
      );
      const result = await service.findAllEngines(undefined);
      expect(repository.findAllEngines).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(mockEngineList);
    });
  });
});
