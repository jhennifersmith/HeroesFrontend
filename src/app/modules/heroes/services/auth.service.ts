import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5160/auth'; // URL da sua API
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response) => {
        if (response.success && response.data) {
          this.storeToken(response.data);
        }
      }),
      catchError((error) => {
        console.error('Login falhou:', error);
        return of({ success: false, message: 'Login falhou. Verifique suas credenciais.' });
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, email, password };

    return this.http.post<any>(`${this.apiUrl}/register`, body, { headers }).pipe(
      tap((response) => {
        if (response.success) {
          console.log('Usuário registrado com sucesso!');
        }
      }),
      catchError((error) => {
        console.error('Erro ao registrar usuário:', error);
        return of({ success: false, message: 'Falha ao registrar usuário. Tente novamente.' });
      })
    );
  }


  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
