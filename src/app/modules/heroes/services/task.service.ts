import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable } from 'rxjs';
import { UserTaskModel } from '../models/user-task.model';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {
  baseUrl = 'http://localhost:5160/api/UserTask'

  constructor(private http: HttpClient) { }


  create(userTaskDTO: UserTaskModel): Observable<UserTaskModel> {
    return this.http.post<UserTaskModel>(this.baseUrl, userTaskDTO);
  }

  getAllUserTasks(): Observable<UserTaskModel[]> {
    return this.http.get<{ data: UserTaskModel[] }>(`${this.baseUrl}/GetAll`).pipe(
      map(response => response.data) 
    );
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  updateTaskStatus(task: UserTaskModel): Observable<UserTaskModel> {
    return this.http.put<UserTaskModel>(this.baseUrl, task);
  }

  

}
