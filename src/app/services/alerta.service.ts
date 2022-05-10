import { Injectable } from '@angular/core';
import { Observable, Subject, throwIfEmpty } from 'rxjs';
import { Alerta } from '../models/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() {
    this.controleAlerta= new Subject<Alerta>();
  }

  private controleAlerta: Subject<Alerta>;

  enviarAlerta(alerta: Alerta): void{
    this.controleAlerta.next(alerta);
  }

  receberAlerta(): Observable<Alerta> {
    return this.controleAlerta.asObservable();
  }
}
