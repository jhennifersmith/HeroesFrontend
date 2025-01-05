import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombatService } from '../../services/combat.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})
export class MissionListComponent implements OnInit {
  missions: any[] = []; // Lista de missões do backend
  characterLevel: number = 1; // Nível do personagem (pegue do backend)
  character: any;

  constructor(private characterService: CharacterService, private missionService: CombatService, private router: Router) {}

  ngOnInit(): void {
    this.loadMissions();
    this.loadCharacter();
  }

  loadMissions(): void {
    this.missionService.getMissions().subscribe((data) => {
      this.missions = data;
    });
  }

  loadCharacter(): void {
    this.characterService.getCharacterByUser().subscribe(
      (data) => {
        this.character = data;
        this.characterLevel = data.data.level
        console.log('character', this.character); // Aqui você pode ver o personagem no console
      },
      (error) => {
        console.error('Error loading character', error);
      }
    );
  }

  canAccessMission(mission: any): boolean {
    return this.characterLevel >= mission.levelRequirement;
  }

  startMission(missionId: number): void {
    this.router.navigate(['/combat/getmission/', missionId]); // Navega para a página de combate
  }
}
