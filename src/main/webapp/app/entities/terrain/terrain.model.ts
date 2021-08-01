import { IAdresse } from 'app/entities/adresse/adresse.model';

export interface ITerrain {
  id?: number;
  parcelle?: string;
  surface?: number | null;
  adresse?: IAdresse | null;
}

export class Terrain implements ITerrain {
  constructor(public id?: number, public parcelle?: string, public surface?: number | null, public adresse?: IAdresse | null) {}
}

export function getTerrainIdentifier(terrain: ITerrain): number | undefined {
  return terrain.id;
}
