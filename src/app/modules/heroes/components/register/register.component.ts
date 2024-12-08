import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private characterService: CharacterService) {}

  onRegister(): void {
    if (this.username && this.password) {
      this.authService.register(this.username, this.email, this.password).subscribe((response) => {
        if (response.success) {
          this.authService.login(this.username, this.password).subscribe((loginResponse) => {
            if (loginResponse.success) {
              this.createCharacter();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Erro ao Logar',
                text: 'Registro bem-sucedido, mas falha ao logar. Tente fazer login manualmente.'
              }).then(() => {
                this.router.navigate(['/login']);
              });
            }
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

  private createCharacter(): void {
    Swal.fire({
      title: 'Crie seu personagem',
      input: 'text',
      inputLabel: 'Nome do personagem',
      inputPlaceholder: 'Digite o nome do personagem',
      showCancelButton: false,
      confirmButtonText: 'Salvar',
      inputValidator: (value) => {
        if (!value) {
          return 'O nome do personagem é obrigatório!';
        }
        return null; 
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const character = {
          name: result.value,
          hitPoints: 100,
          experience: 0,
          level: 1,
          strenght: 10,
          defense: 10,
          intelligence: 10
        };
  
        this.characterService.addCharacter(character).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Personagem criado com sucesso!',
            text: 'Bem-vindo ao jogo!',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/home']);
          });
        });
      }
    });
  }
}
