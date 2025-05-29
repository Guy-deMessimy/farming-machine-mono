import { Test, TestingModule } from '@nestjs/testing';
import { EngineTypesService } from './engine-type.service';

describe.skip('EngineTypeService', () => {
  let service: EngineTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineTypesService],
    }).compile();

    service = module.get<EngineTypesService>(EngineTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
