import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword = true; // Para o controle de visibilidade da senha

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          this.router.navigate(['/home']); // Redireciona após o login bem-sucedido
        } else {
          console.error('Login failed');
        }
      },
      (error) => {
        console.error('Login error', error);
      }
    );
  }
}
