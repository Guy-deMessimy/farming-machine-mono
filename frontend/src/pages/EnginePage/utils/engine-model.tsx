export interface EngineModel {
  id: number;
  modelName: string;
  brandName: string;
  conception: string;
  engineKwPower: number;
  engineCcPower: number;
  MaxKmhSpeed: number;
  PetrolLitreTank: number;
  TankLitre: number;
  WeightKg: number;
  WorkingWidth: number;
  CopiesNumber: number;
  imageUrl: string;
}

export interface MachineType {
  id: number;
  name: string;
}
