import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse } from '../interfaces/servi.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(public http: HttpClient) { }

  // Función para obtener el token CSRF desde las cookies
  async getCsrfToken(): Promise<string> {
    console.log("Obteniendo CSRF token...");
    try {
      await this.http.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true }).toPromise();
      
      // Leer el token CSRF de la cookie
      const xsrfToken = this.getCookie('XSRF-TOKEN');
      console.log("Token CSRF recibido:", xsrfToken);
      return xsrfToken;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      throw error;
    }
  }

  // Función para leer una cookie
  private getCookie(name: string): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
    return '';
  }

  async enviarDatos(formData: Login): Promise<Observable<LoginResponse>> {
    console.log('Enviando datos al servidor...');
    
    // Obtener el token CSRF de la cookie
    const xsrfToken = await this.getCsrfToken();
    console.log('csrfToken', xsrfToken);

    // Configurar los encabezados para incluir el token CSRF
    const headers = new HttpHeaders().set('X-XSRF-TOKEN', xsrfToken || '');

    // Realizar la solicitud POST con los encabezados y credenciales
    return this.http.post<LoginResponse>('http://localhost:8000/api/api/login', formData, { headers, withCredentials: true });
  }
}