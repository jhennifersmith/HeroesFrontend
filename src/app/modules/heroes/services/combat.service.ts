import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombatResponse } from '../models/combat-response.model';
import { CharacterModel } from '../models/character.model';
import { MissionModel } from '../models/mission.model';
import { MonsterModel } from '../models/monster.model';

@Injectable({
  providedIn: 'root'
})
export class CombatService {
  private apiUrl = 'http://localhost:5160/api/Combat'; // URL da API para combates
  private characterUrl = 'http://localhost:5160/api/Character'; // URL para obter os personagens
  private missionUrl = 'http://localhost:5160/api/Combat/GetMission'; // URL para obter as missões
  private monsterUrl = 'http://localhost:5160/api/Combat/GetMonster'; // URL para obter os monstros

  constructor(private http: HttpClient) {}

  // Carregar os dados do personagem
  getCharacter(characterId: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.characterUrl}/${characterId}`);
  }

  // Carregar os dados da missão
  getMission(missionId: number): Observable<MissionModel> {
    return this.http.get<MissionModel>(`${this.apiUrl}/GetMission/${missionId}`);
  }

  getMissions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetMissions`);
  }

  // Carregar os dados do monstro para a missão
  getMonstersByMissionId(missionId: number): Observable<MonsterModel[]> {
    return this.http.get<MonsterModel[]>(`${this.apiUrl}/ByMission/${missionId}`);
  }

  // Atacar o monstro
  characterAttack(characterId: number, missionId: number): Observable<CombatResponse> {
    return this.http.post<CombatResponse>(`${this.apiUrl}/CharacterAttack`, { characterId, missionId });
  }

  // Ataque mágico do personagem ao monstro
  characterMagicAttack(characterId: number, missionId: number): Observable<CombatResponse> {
    return this.http.post<CombatResponse>(`${this.apiUrl}/CharacterMagicAttack`, { characterId, missionId });
  }

  // Ataque do monstro ao personagem
  // monsterAttack(characterId: number, monsterId: number): Observable<CombatResponse> {
  //   return this.http.post<CombatResponse>(`${this.apiUrl}/MonsterAttack`, { characterId, monsterId });
  // }

  // Método para obter o status da missão do usuário
  getUserMissionStatus(characterId: number, missionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status/${characterId}/${missionId}`);
  }

  // Método para completar a missão
  completeMission(characterId: number, missionId: number): Observable<any> {
    const payload = { characterId, missionId };
    return this.http.put<any>(`${this.apiUrl}/usermissions`, payload);
  }
}
