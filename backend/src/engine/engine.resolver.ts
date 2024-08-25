import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { EngineService } from './engine.service';
import { Engine } from './engine.entity';

@Resolver('EngineResolver')
export class EngineResolver {
  constructor(private readonly engineService: EngineService) {}

  @Query(() => [Engine])
  async getEngines(@Info() info: GraphQLResolveInfo) {
    // @Args('query', { nullable: true })
    console.log('Query received in BACKEND');
    console.log('Resolver: getAgriculturalMachines called');
    console.log('Received query:', info);
    // console.log('Received variables:', variables);
    try {
      const result = await this.engineService.getEngineList(
        // variables,

        info,
      );
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
