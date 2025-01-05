import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  character: CharacterModel;

  constructor(private characterService: CharacterService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.loadCharacter();
  }

  loadCharacter(): void {
    this.characterService.getCharacterByUser().subscribe({
      next: (response) => {
        if (response.success) {
          this.character = response.data;
          this.cdr.detectChanges();
        } else {
          console.error(response.message);
        }
      },
      error: (error) => {
        console.error('Error loading character:', error);
      },
    });
  }

  goToMissions() {
    this.router.navigate(['/missions']);
  }
}
