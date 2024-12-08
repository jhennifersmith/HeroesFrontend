import { Component, OnInit } from '@angular/core';
import { UserTaskModel } from '../../models/user-task.model';
import { UserTaskService } from '../../services/task.service';
import { DurationEnum } from '../../models/duration.enum';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialog } from '../create-task-dialog/create-task-dialog.component';

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

  constructor(private taskService: UserTaskService, private dialog: MatDialog) { }

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
      return 'Hoje';
    } else if (task.duration === 'Week') {
      const dueDate = new Date(creationDate);
      dueDate.setDate(creationDate.getDate() + 7);
      return dueDate.toLocaleDateString('pt-BR');
    } else if (task.duration === 'Month') {
      const dueDate = new Date(creationDate);
      dueDate.setMonth(creationDate.getMonth() + 1);
      return dueDate.toLocaleDateString('pt-BR');
    }
    return '';
  }

  addTask(): void {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      modalElement.style.display = "block"
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
    this.taskService.completeUserTask(task.id).subscribe(() => {
      task.status = true;
      this.filterTasks();
    });
  }
}
