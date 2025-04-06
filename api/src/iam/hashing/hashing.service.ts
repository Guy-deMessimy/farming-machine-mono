import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  // define two abstract methods that will have to be provided by the concrete implementations
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
