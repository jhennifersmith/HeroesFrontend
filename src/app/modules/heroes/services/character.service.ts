// src/app/services/character.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterModel } from '../models/character.model';

interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'http://localhost:5160/api/Character'; // Ajuste conforme sua URL da API

  constructor(private http: HttpClient) { }

  // Método para obter todos os personagens
  getAllCharacters(): Observable<CharacterModel[]> {
    return this.http.get<CharacterModel[]>(this.apiUrl);
  }

  // Método para obter um personagem específico pelo ID
  getCharacterById(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${this.apiUrl}/${id}`);
  }

  // Método para atualizar um personagem
  updateCharacter(character: CharacterModel): Observable<CharacterModel> {
    return this.http.put<CharacterModel>(`${this.apiUrl}`, character);
  }

  // Método para deletar um personagem
  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para adicionar um novo personagem
  addCharacter(character: CharacterModel): Observable<CharacterModel> {
    return this.http.post<CharacterModel>(this.apiUrl, character);
  }

  getCharacterByUser(): Observable<ServiceResponse<CharacterModel>> {
    return this.http.get<ServiceResponse<CharacterModel>>(`${this.apiUrl}/user`);
  }
}
