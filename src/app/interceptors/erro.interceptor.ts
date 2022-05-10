import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertaService } from '../services/alerta.service';
import { ETipoAlerta } from '../models/e-tipo-alerta';
import { Alerta } from '../models/alerta';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  private readonly ERRO_HTTP: { [key: number]: string } = {
    404: 'Recurso não encontrado.',
    500: 'Erro interno do servidor.'
  }

  constructor(
    private servicoAlerta: AlertaService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(erro => this.processaErro(erro)));
  }

  processaErro(erro: HttpErrorResponse): Observable<any>{
    let mensagemErro = this.ERRO_HTTP[erro.status] || erro.error?.message || erro.statusText;
    let alerta: Alerta = {
      tipo: ETipoAlerta.ERRO,
      mensagem: mensagemErro
    }
    this.servicoAlerta.enviarAlerta(alerta);
    return throwError(() => erro);
  }
}
