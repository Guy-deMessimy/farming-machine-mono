import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './bcrypt.service';

describe('BcryptService', () => {
  let service: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hould hash and verify valid password', async () => {
    const plainText = 'securePassword';
    const hashed = await service.hash(plainText);
    expect(hashed).not.toBe(plainText);
    expect(hashed).toMatch(/^\$2[aby]\$/);
    const isValid = await service.compare(plainText, hashed);
    expect(isValid).toBe(true);
  });

  it('should return false for incorrect password', async () => {
    const hash = await service.hash('correctPassword');
    const isValid = await service.compare('wrongPassword', hash);

    expect(isValid).toBe(false);
  });
});
