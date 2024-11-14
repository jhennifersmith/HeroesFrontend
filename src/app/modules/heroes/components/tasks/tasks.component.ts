import { Component, OnInit } from '@angular/core';
import { UserTaskModel } from '../../models/user-task.model';
import { UserTaskService } from '../../services/task.service';
import { DurationEnum } from '../../models/duration.enum';
import Swal from 'sweetalert2';

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

  constructor(private taskService: UserTaskService) {}

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
    this.dailyTasks = this.allTasks.filter(task => task.duration === 'Day' && task.status === false);
    this.weeklyTasks = this.allTasks.filter(task => task.duration === 'Week' && task.status === false);
    this.monthlyTasks = this.allTasks.filter(task => task.duration === 'Month' && task.status === false);
  }

  getDueDate(task: UserTaskModel): string {
    const creationDate = new Date(task.creationDate);
    if (task.duration === 'Day') {
      return 'Hoje'; // Para tarefas diárias, a data é "Hoje"
    } else if (task.duration === 'Week') {
      const dueDate = new Date(creationDate);
      dueDate.setDate(creationDate.getDate() + 7); // Adiciona 7 dias para tarefas semanais
      return dueDate.toLocaleDateString('pt-BR'); // Retorna a data formatada no padrão brasileiro
    } else if (task.duration === 'Month') {
      const dueDate = new Date(creationDate);
      dueDate.setMonth(creationDate.getMonth() + 1); // Adiciona 1 mês para tarefas mensais
      return dueDate.toLocaleDateString('pt-BR'); // Retorna a data formatada no padrão brasileiro
    }
    return '';
  }

  addTask(duration: string): void {
    // Lógica para adicionar uma nova tarefa com duração específica
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
    const updatedTask = { ...task, status: true };
    this.taskService.updateTaskStatus(updatedTask).subscribe(() => {
      task.status = true;
      this.filterTasks();
    });
  }
}
