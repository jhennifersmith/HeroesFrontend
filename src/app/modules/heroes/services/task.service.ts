import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';
import  Swal from 'sweetalert2'
import { UserTaskModel } from '../models/user-task.model';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {
  baseUrl = 'http://localhost:5160/api/UserTask'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }


  create(userTaskDTO: UserTaskModel): Observable<UserTaskModel> {
    return this.http.post<UserTaskModel>(this.baseUrl, userTaskDTO).pipe(
      catchError( e => this.errorHandler(e))
    );
  }

  getAllUserTasks(): Observable<UserTaskModel[]> {
    return this.http.get<UserTaskModel[]>(`${this.baseUrl}/GetAll`);
  }

  read(): Observable<UserTaskModel[]> {
    const url = `${this.baseUrl}/GetAll/`
    return this.http.get<UserTaskModel[]>(url).pipe(
      catchError( e => this.errorHandler(e))
    );
  }

  // readById(id: number): Observable<AgendamentoDTO> {
  //   const url = `${this.baseUrl}/${id}`
  //   return this.http.get<Agendamento>(url).pipe(
  //     catchError( e => this.errorHandler(e))
  //   );
  // }

  // update(userTaskDTO: AgendamentoDTO): Observable<Agendamento> {
  //   const url = `${this.baseUrl}/`
  //   return this.http.put<Agendamento>(url, agendamentoDTO).pipe(
  //     catchError( e => this.errorHandler(e))
  //   );
  // }

  // search(agendamentoFilter: AgendamentoFilter): Observable<ListResponse<AgendamentoGridDTO>> {
  //   const url = `${this.baseUrl}/search/`
  //   return this.http.post<ListResponse<AgendamentoGridDTO>>(url, agendamentoFilter).pipe(
  //     catchError( e => this.errorHandler(e))
  //   );
  // }

  sucessMessage(msg: string){
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: msg,
      width: 600,
      padding: '3em',
      color: '#000',
      background: '#fff',
      confirmButtonColor: '#000',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/cybdHYBCerIAAAAj/pokemon-charmander.gif")
        left top
        no-repeat
      `
    })
    return EMPTY
  }

  errorHandler(e: any): Observable<any> {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: e.error,
      width: 600,
      padding: '3em',
      color: '#000',
      background: '#fff',
      confirmButtonColor: '#000',
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/cybdHYBCerIAAAAj/pokemon-charmander.gif")
        left top
        no-repeat
      `
    })
    return EMPTY
  }

}
