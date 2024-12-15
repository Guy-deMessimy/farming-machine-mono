import { Test, TestingModule } from '@nestjs/testing';
import { EngineTypeResolver } from './engine-type.resolver';

describe('EngineTypeResolver', () => {
  let resolver: EngineTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EngineTypeResolver],
    }).compile();

    resolver = module.get<EngineTypeResolver>(EngineTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
