import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { UserTaskModel } from '../../models/user-task.model';
import { UserTaskService } from '../../services/task.service';
import { DurationEnum } from '../../models/duration.enum';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
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
    this.dailyTasks = this.allTasks.filter(task => task.duration === DurationEnum.Day);
    this.weeklyTasks = this.allTasks.filter(task => task.duration === DurationEnum.Week);
    this.monthlyTasks = this.allTasks.filter(task => task.duration === DurationEnum.Month);
  }

  addTask(duration: DurationEnum): void {
    // Lógica para adicionar uma nova tarefa com duração específica
  }

  editTask(task: UserTaskModel): void {
    // Lógica para edição de tarefas
  }

  markAsComplete(task: UserTaskModel): void {
    // task.status = true;
    // this.taskService.up(task).subscribe(() => {
    //   this.loadTasks(); // Recarrega as tarefas para atualizar o status
    // });
  }
}
