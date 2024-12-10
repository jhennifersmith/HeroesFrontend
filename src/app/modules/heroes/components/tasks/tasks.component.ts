import { Component, OnInit } from '@angular/core';
import { UserTaskModel } from '../../models/user-task.model';
import { UserTaskService } from '../../services/task.service';
import { DurationEnum } from '../../models/duration.enum';
import Swal from 'sweetalert2';
import { CharacterService } from '../../services/character.service';
import { CharacterModel } from '../../models/character.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  dailyTasks: UserTaskModel[] = [];
  weeklyTasks: UserTaskModel[] = [];
  monthlyTasks: UserTaskModel[] = [];
  allTasks: UserTaskModel[] = [];
  DurationEnum = DurationEnum;
  teste = '';
  character: CharacterModel;
  task: UserTaskModel = {
    title: '',
    category: null,
    duration: null,
    status: false,
    creationDate: new Date()
  };

  constructor(private characterService: CharacterService, private taskService: UserTaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllUserTasks().subscribe((tasks) => {
      this.allTasks = tasks;
      this.filterTasks();
    });
  }

  filterTasks(): void {
    this.dailyTasks = this.allTasks.filter(task => task.duration === 'Dia' && task.status === false);
    this.weeklyTasks = this.allTasks.filter(task => task.duration === 'Semana' && task.status === false);
    this.monthlyTasks = this.allTasks.filter(task => task.duration === 'Mes' && task.status === false);
  }

  getDueDate(task: UserTaskModel): string {
    const creationDate = new Date(task.creationDate);
    if (task.duration === 'Dia') {
      return 'Hoje';
    } else if (task.duration === 'Semana') {
      const dueDate = new Date(creationDate);
      dueDate.setDate(creationDate.getDate() + 7);
      return dueDate.toLocaleDateString('pt-BR');
    } else if (task.duration === 'Mes') {
      const dueDate = new Date(creationDate);
      dueDate.setMonth(creationDate.getMonth() + 1);
      return dueDate.toLocaleDateString('pt-BR');
    }
    return '';
  }

  addTask(duration: DurationEnum): void {
    // Atribuir o valor de duração diretamente ao modelo 'task'
    this.task.duration = duration;

    // Exibir o modal
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      modalElement.style.display = "block";
    }
  }

  confirmRemoveTask(task: UserTaskModel): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja excluir esta tarefa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task.id).subscribe(() => {
          this.allTasks = this.allTasks.filter(t => t.id !== task.id);
          this.filterTasks();
          Swal.fire('Excluído!', 'A tarefa foi excluída.', 'success');
        });
      }
    });
  }

  markAsComplete(task: UserTaskModel): void {
    if (!task.id) return;

    this.taskService.completeUserTask(task.id).subscribe((response) => {
      const { attributesGained, experienceGained, levelUpCount } = response;

      let message = 'Você ganhou:<br>';
      if (attributesGained.strength > 0) message += `• Força: ${attributesGained.strength}<br>`;
      if (attributesGained.hitPoints > 0) message += `• Vitalidade: ${attributesGained.hitPoints}<br>`;
      if (attributesGained.defense > 0) message += `• Defesa: ${attributesGained.defense}<br>`;
      if (attributesGained.intelligence > 0) message += `• Inteligência: ${attributesGained.intelligence}<br>`;
      message += `• Experiência: ${experienceGained}%<br>`;

      if (levelUpCount > 0) {
        message += `<br>🎉 Parabéns! Você subiu ${levelUpCount} nível(is)! 🎉`;
      }

      Swal.fire({
        icon: 'success',
        title: 'Tarefa Concluída!',
        html: message, // Usando `html` para suportar <br>
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // Refresh the page only after the user closes the SweetAlert
          this.loadTasks();
          this.refreshPage();
        }
      });
    });
  }

  refreshPage(): void {
    window.location.reload();
  }

  submitTask(): void {
    if (!this.task.title || !this.task.category) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Por favor, preencha todos os campos obrigatórios!',
      });
      return;
    }

    this.task.creationDate = new Date();
    this.taskService.create(this.task).subscribe(() => {
      console.log('Tarefa criada com sucesso');
      const modalElement = document.getElementById('taskModal');
      if (modalElement) {
        modalElement.style.display = "none";
      }
    });
    this.refreshPage();
  }

  onClose() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      modalElement.style.display = "none";
    }
    this.resetForm();
    this.refreshPage();
  }

  resetForm(): void {
    this.task = {
      title: '',
      category: null,
      duration: null,
      status: false,
      creationDate: new Date(),
    };
  }


}