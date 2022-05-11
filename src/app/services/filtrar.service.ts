import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../models/atendimento';

@Injectable({
  providedIn: 'root'
})
export class FiltrarService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.apiUrl + '/atendimento/';

  get(id: number): Observable<Atendimento[]>{
    let url = this.apiUrl + 'filtrar/profissional/' + id;
    return this.http.get<Atendimento[]>(url);
  }
}
