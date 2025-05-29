import { Test, TestingModule } from '@nestjs/testing';
import { EngineModelResolver } from './engine-model.resolver';

describe.skip('EngineModelResolver', () => {
  let resolver: EngineModelResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineModelResolver],
    }).compile();

    resolver = module.get<EngineModelResolver>(EngineModelResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
