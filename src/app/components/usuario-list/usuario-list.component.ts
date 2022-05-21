import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AlertaService } from 'src/app/services/alerta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: [
  ]
})
export class UsuarioListComponent implements OnInit, IComponentList<Usuario> {

  constructor(private servico: UsuarioService,
              private servicoAlerta: AlertaService
            ) { }

  registros: Usuario[] = Array<Usuario>();

  papel : any = {'ROLE_ADMIN': 'Administrador',
                  'ROLE_ATENDENTE': 'Atendente'
                }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Usuario[]) => {
        this.registros = resposta;
      }
    })
  }

  delete(id: number): void {
    if(confirm('Confirma exclusão deste usuário?')){
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  ngOnInit(): void {
    this.get();
  }

}
