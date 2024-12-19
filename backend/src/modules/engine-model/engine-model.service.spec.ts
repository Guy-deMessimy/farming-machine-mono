import { Test, TestingModule } from '@nestjs/testing';
import { EngineModelService } from './engine-model.service';

describe('EngineModelService', () => {
  let service: EngineModelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineModelService],
    }).compile();

    service = module.get<EngineModelService>(EngineModelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
