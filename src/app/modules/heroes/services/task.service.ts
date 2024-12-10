import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserTaskModel } from '../models/user-task.model';
import { CompleteTaskResponseDto } from '../models/completeTask.dto';

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

  completeUserTask(taskId: number): Observable<CompleteTaskResponseDto> {
    return this.http.put<CompleteTaskResponseDto>(`${this.baseUrl}/complete/${taskId}`, {});
  }

}
