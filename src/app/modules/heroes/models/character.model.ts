// src/app/models/character.model.ts
export interface CharacterModel {
    id?: number;
    name: string;
    hitPoints: number;
    experience: number;
    level: number;
    strenght: number;
    defense: number;
    intelligence: number;
    user?: object;
  }
  