import { Resolver, Query } from '@nestjs/graphql';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';

@Resolver('EngineResolver')
export class EngineResolver {
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine])
  async getAgriculturalMachines() {
    console.log('Query received in BACKEND');
    console.log('Resolver: getAgriculturalMachines called');
    try {
      const result = await this.engineService.getAgriculturalMachines();
      console.log('Query received in BACKEND');
      console.log(
        'Resolver: getAgriculturalMachines result:',
        JSON.stringify(result, null, 2),
      );
      console.log('Resolver: getAgriculturalMachines result 2:', result);

      return result;
    } catch (error) {
      console.error('Resolver: getAgriculturalMachines error:', error);
      throw error;
    }
  }
}
