import { Test, TestingModule } from '@nestjs/testing';
import { EngineResolver } from './engine.resolver';

describe('EngineResolver', () => {
  let resolver: EngineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineResolver],
    }).compile();

    resolver = module.get<EngineResolver>(EngineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
