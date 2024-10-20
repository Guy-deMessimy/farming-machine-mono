import { Resolver, Query, Context } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';

@Resolver(() => Engine)
export class EngineResolver {
  private readonly logger = new Logger(EngineResolver.name);
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine], { nullable: true })
  getEngines(@Context() context: { req: Request }): Observable<Engine[]> {
    try {
      const requestBody = context.req.body.query;
      const result = this.engineService.getEngineList(requestBody);
      return result;
    } catch (error) {
      this.logger.error('Resolver: getEngines error:', error.stack);
      throw error;
    }
  }
}
