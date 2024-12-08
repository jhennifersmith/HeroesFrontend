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
  character: CharacterModel; 

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {
    this.characterService.getCharacterByUser().subscribe(
      response => {
        if (response.success) {
          this.character = response.data; 
        } else {
          console.error(response.message); 
        }
      },
      error => {
        console.error('Error loading character:', error);
      }
    );
  }
}
