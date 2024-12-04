import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onRegister(): void {
    if (this.username && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe((response) => {
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: 'Registro bem-sucedido!',
            text: 'Você será redirecionado para a página de login.',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro no Registro',
            text: response.message || 'Ocorreu um problema. Tente novamente.'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos Obrigatórios',
        text: 'Por favor, preencha todos os campos.'
      });
    }
  }
}
