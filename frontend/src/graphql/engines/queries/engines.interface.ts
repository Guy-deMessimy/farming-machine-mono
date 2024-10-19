// Types pour le tri
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// Interface pour EngineOrderByInput
export interface EngineOrderByInput {
  id?: SortOrder; // Tri sur l'ID
  modelName?: SortOrder; // Tri sur le nom du modèle
  brandName?: SortOrder; // Tri sur le nom de la marque
  // Ajoute d'autres champs selon tes besoins
}

// Interface pour EngineWhereInput
export interface EngineWhereInput {
  id?: number; // Filtrer par ID
  modelName?: string; // Filtrer par nom de modèle
  brandName?: string; // Filtrer par nom de marque
  // Ajoute d'autres champs selon tes besoins
}

// Définition de EngineQueryDto
export interface EngineQueryDto {
  limit?: number; // Nombre maximum de résultats
  offset?: number; // Décalage pour la pagination
  cursor?: number; // ID pour le curseur de pagination
  orderBy?: EngineOrderByInput; // Critères de tri
  where?: EngineWhereInput; // Critères de filtrage
}
