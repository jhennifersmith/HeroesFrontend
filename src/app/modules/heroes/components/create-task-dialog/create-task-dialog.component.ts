import { Component } from '@angular/core';
import { UserTaskModel } from '../../models/user-task.model';
import { UserTaskService } from '../../services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.scss']
})
export class CreateTaskDialog {
  task: UserTaskModel = {
    title: '',
    category: null,
    duration: null,
    status: false,
    creationDate: new Date()
  };

  constructor(private taskService: UserTaskService) { }
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

  refreshPage(): void {
    window.location.reload();
  }
}
