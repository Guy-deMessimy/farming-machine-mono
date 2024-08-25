import { Injectable } from '@nestjs/common';
import { ApiService } from '../shared/api-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Engine } from './engine.entity';
import { GraphQLResolveInfo, print, Kind } from 'graphql';

@Injectable()
export class EngineService {
  constructor(private apiService: ApiService) {}

  getEngineList(info: GraphQLResolveInfo): Observable<Engine[]> {
    const query = this.extractQueryFromInfo(info);
    console.log('Extracted query:', query);
    return this.apiService
      .query<{ getEngines: Engine[] }>(query)
      .pipe(map((data) => data.getEngines));
  }

  private extractQueryFromInfo(info: GraphQLResolveInfo): string {
    const operationDefinition = info.operation;
    const fieldNode = info.fieldNodes[0];

    // Créer une nouvelle opération avec le bon nom de champ
    const newOperation = {
      ...operationDefinition,
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections: [fieldNode],
      },
    };

    return print(newOperation as any);
  }
}
