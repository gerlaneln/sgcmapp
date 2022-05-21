import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
import { ICrudService } from './i-crud-service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements ICrudService<Usuario>{

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl + '/config/usuario/';

  get(termoBusca?: string): Observable<Usuario[]> {
    let url = this.apiUrl;
    if(termoBusca){
      url += 'busca/'+termoBusca;
    }
    return this.http.get<Usuario[]>(url);
  }

  getById(id: number): Observable<Usuario> {
    let url = this.apiUrl + id;
    return this.http.get<Usuario>(url);
  }

  insert(objeto: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, objeto);
  }

  update(objeto: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl, objeto);
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
