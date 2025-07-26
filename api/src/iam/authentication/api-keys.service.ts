import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HashingService } from '../hashing/hashing.service';
import { GeneratedApiKeyPayload } from './interfaces/api-key-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApiKeysService {
  private readonly logger = new Logger(ApiKeysService.name);
  constructor(
    private readonly hashingService: HashingService,
    private readonly prisma: PrismaService,
  ) {}

  async validate(apiKey: string, hashedKey: string): Promise<boolean> {
    return this.hashingService.compare(apiKey, hashedKey);
  }


extractIdFromApiKey(apiKey: string): number {
  const [id] = Buffer.from(apiKey, 'base64').toString('ascii').split(' ');
    return parseInt(id, 10);
  }


  async findByUuidOrThrow(id: number) {
    const record = await this.prisma.apiKey.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            role: true,
          },
        },
        permissions: true,
      },
    });

    if (!record || !record.isActive || record.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid or expired API Key');
    }
    return record;
  }

  private generateApiKey(id: string): string {
    const raw = `${id} ${randomUUID()}`;
    return Buffer.from(raw).toString('base64');
  }
}
