import { Injectable } from '@nestjs/common';
import { ApiService } from '../shared/api-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Engine } from './engine.entity';

@Injectable()
export class EngineService {
  constructor(private apiService: ApiService) {}

  getAgriculturalMachines(): Observable<any[]> {
    const query = `
      query {
        getEngines {
        id
    copiesNumber
    maxKmhSpeed
    petrolLitreTank
    modelName
    brandName
        }
      }
    `;
    return this.apiService
      .query<{ getEngines: any[] }>(query)
      .pipe(map((data) => data.getEngines));
  }

  // getAgriculturalMachines() {
  //   const query = `
  //     query {
  //       getEngines {
  //       id
  //   copiesNumber
  //   maxKmhSpeed
  //   petrolLitreTank
  //   modelName
  //   brandName
  //       }
  //     }
  //   `;
  //   return console.log('query', query);
  // }
}