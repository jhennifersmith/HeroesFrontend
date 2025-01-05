import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CombatService } from '../../services/combat.service';
import { CharacterService } from '../../services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {
  missionId: number;
  mission: any;
  monster: any = null;
  combatLog: string[] = [];
  character: any;
  missionComplete: boolean = false;
  characterId: number;
  missionCompletedByUser: boolean = false; 
  
  constructor(
    private route: ActivatedRoute,
    private combatService: CombatService,
    private characterService: CharacterService,
  ) {}

  ngOnInit(): void {
    this.missionId = +this.route.snapshot.paramMap.get('missionId');
    this.loadCharacter();
    this.loadMissionData();
  }

  loadMissionData(): void {
    this.combatService.getMission(this.missionId).subscribe((response: any) => {
      this.mission = response;
      this.loadMonster();
    });
  }

  loadCharacter(): void {
    this.characterService.getCharacterByUser().subscribe(
      (data) => {
        this.character = data;
        this.characterId = data.data.id;
        this.checkMissionCompletion(this.characterId);
      },
      (error) => {
        console.error('Erro carregando personagem', error);
      }
    );
  }

  loadMonster(): void {
    this.combatService.getMonstersByMissionId(this.missionId).subscribe((response: any) => {
      if (response && response.length > 0) {
        this.monster = response[0]; 
      } else {
        console.error('Nenhum monstro para essa missão.');
      }
    });
  }

  performAction(action: string): void {
    this.checkMissionCompletion(this.characterId);
    if (!this.monster) return;

    if (action === 'attack') {
      this.combatService.characterAttack(this.characterId, this.mission.id).subscribe((response: any) => {
        this.updateCombatState(response, action);
      });
    } else if (action === 'magic') {
      this.combatService.characterMagicAttack(this.characterId, this.mission.id).subscribe((response: any) => {
        this.updateCombatState(response, action);
      });
    }
  }

  updateCombatState(response: any, action: string): void {
    this.combatLog.push(...response.data.combatLog);
  }

  checkMissionCompletion(characterId: number): void {
    this.combatService.getUserMissionStatus(characterId, this.missionId).subscribe(
      (response: any) => {
        if (response && response.isCompleted !== undefined) {
          this.missionCompletedByUser = response.isCompleted;
          if (this.missionCompletedByUser) {
            this.missionComplete = true;
            console.log('Missão já completada pelo usuário');
          }

        } else {
          console.error('Resposta inválida do servidor:', response);
        }
      },
      (error) => {
        console.error('Erro ao verificar status da missão', error);
      }
    );
  }
}
