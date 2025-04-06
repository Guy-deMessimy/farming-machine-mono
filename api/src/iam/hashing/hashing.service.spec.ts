import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from './hashing.service';
import { BcryptService } from './bcrypt.service';

describe('HashingService', () => {
  let hashingService: HashingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: HashingService,
          useClass: BcryptService,
        },
      ],
    }).compile();

    hashingService = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(hashingService).toBeDefined();
  });

  it('should hash and verify password correctly', async () => {
    const password = 'superSecret123!';
    const hash = await hashingService.hash(password);
    const isValid = await hashingService.compare(password, hash);

    expect(isValid).toBe(true);
  });


});
