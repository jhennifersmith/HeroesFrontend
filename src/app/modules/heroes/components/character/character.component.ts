import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterModel } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  character: CharacterModel; // Usamos um ponto de exclamação para indicar que o valor não é nulo após a inicialização

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {
    this.characterService.getCharacterByUser().subscribe(
      response => {
        if (response.success) {
          this.character = response.data; // Atribui os dados recebidos
        } else {
          console.error(response.message); // Log de erro
        }
      },
      error => {
        console.error('Error loading character:', error);
      }
    );
  }
}
