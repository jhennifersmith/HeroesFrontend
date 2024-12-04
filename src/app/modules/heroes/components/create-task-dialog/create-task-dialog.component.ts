import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserTaskModel } from '../../models/user-task.model'; 
import { CategoryEnum } from '../../models/category.enum';
import { DurationEnum } from '../../models/duration.enum';
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

  constructor(private taskService: UserTaskService) {}
  submitTask(): void {
    if (!this.task.title || !this.task.category || !this.task.duration) {
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
  }

  onClose() {
    const modalElement = document.getElementById('taskModal');
    if (modalElement) {
      modalElement.style.display = "none";
    }
  }
}
