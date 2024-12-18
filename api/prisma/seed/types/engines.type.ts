export interface EngineInput {
  modelName: string;
  brandName: string;
  description: string,
  ref: string,
  conception: string;
  engineKwPower: number;
  engineCcPower: number;
  maxKmhSpeed: number;
  petrolLitreTank: number;
  tankLitre: number;
  autonomyMn: number,    
  liftingHeightMeter: number,
  weightKg: number;
  workingWidth: number;
  copiesNumber: number;
  engineModelId: number;
  imageUrl: string;
}

export interface EngineModelInput {
  name: string;
  description: string,
  engineTypeId: number,
}



export interface TypeInput {
  name: string;
  description: string;
}

export interface ParsedArgs {
  values: {
    environment?: string;
  };
}