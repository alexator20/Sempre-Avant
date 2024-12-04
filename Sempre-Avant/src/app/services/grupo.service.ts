import { Injectable, } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResponseTest, Grupo } from '../interfaces/grupo.interface';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(public http: HttpClient) { }

  recibirDatosGrupos(page: number, pageSize: number): Observable<ApiResponseTest> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponseTest>('http://localhost:8000/api/groups', { params });
  }


  enviarDatosDel(id: string) {
    if (id) {
      console.log('pidiendo a la api', id);
      return this.http.post(`http://localhost:8000/deleteGroup/${id}`, {});
    } else {
      console.log('El ID no es válido');
      console.log(id);
      // Aquí podrías lanzar un error, devolver un observable de error, o manejar la situación de otra manera según tu lógica de negocio.
      return EMPTY; // Por ejemplo, si no quieres hacer nada si el ID no es válido, puedes devolver EMPTY.
    }
  }

    //esto está copiado del user hay que arreglarlo
  enviarDatosInsert(formData: Grupo) {
    return this.http.post('http://localhost:8000/insertGrupo', formData);
  }


  enviarDatosUpdate(id: string, formData: Grupo) {
    if (id) {
      console.log(id);
    } else {
      console.log('??????');
    }

    return this.http.post(`http://localhost:8000/updateGroup/${id}`, formData);
  }
}
