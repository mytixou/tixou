import { ITerrain } from 'app/entities/terrain/terrain.model';

export interface IBatiment {
  id?: number;
  nom?: string;
  emprise?: number | null;
  hauteur?: number | null;
  etages?: number | null;
  terrain?: ITerrain | null;
}

export class Batiment implements IBatiment {
  constructor(
    public id?: number,
    public nom?: string,
    public emprise?: number | null,
    public hauteur?: number | null,
    public etages?: number | null,
    public terrain?: ITerrain | null
  ) {}
}

export function getBatimentIdentifier(batiment: IBatiment): number | undefined {
  return batiment.id;
}
