import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { tap, catchError } from 'rxjs/operators';
import { Login, LoginResponse } from '../../interfaces/servi.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reactiveForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  public rol: string = "";
  public error: string = "";

  constructor(public formularioService: LoginService, private router: Router) { }

  async onSubmit() {
    const userData: Login = {
      name: this.reactiveForm.value.username ?? null,
      password: this.reactiveForm.value.password ?? null
    };

    try {
      // Obtener el Observable usando await
      const observable = await this.formularioService.enviarDatos(userData);

      // Usar el Observable con .pipe()
      observable.pipe(
        tap((response: LoginResponse) => {
          console.log('Respuesta del servidor:', response);

          // Verificar si la respuesta tiene la estructura esperada
          if (response.user && response.user.rol) {
            this.rol = response.user.rol;
          } else {
            this.rol = "user";
          }

          // Guardar el rol en localStorage
          localStorage.setItem('rol', this.rol);

          // Navegar a la ruta '/home'
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          console.error('Error al enviar los datos:', error);
          this.error = "Error al iniciar sesión. Inténtalo de nuevo.";
          return of(null); // Retornar un Observable para manejar el error sin romper el flujo
        })
      ).subscribe();
    } catch (error) {
      console.error('Error al enviar datos:', error);
      this.error = "Error al iniciar sesión. Inténtalo de nuevo.";
    }
  }
}