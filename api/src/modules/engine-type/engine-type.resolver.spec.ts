import { Test, TestingModule } from '@nestjs/testing';
import { EngineTypesResolver } from './engine-type.resolver';

describe.skip('EngineTypeResolver', () => {
  let resolver: EngineTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineTypesResolver],
    }).compile();

    resolver = module.get<EngineTypesResolver>(EngineTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
