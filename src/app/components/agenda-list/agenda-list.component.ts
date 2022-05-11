import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento';
import { AlertaService } from 'src/app/services/alerta.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})
export class AgendaListComponent implements OnInit, IComponentList<Atendimento> {

  constructor(private servico: AtendimentoService,
              private servicoAlerta: AlertaService
            ) { }

  registros: Atendimento[] = Array<Atendimento>();

  get(termoBusca?: string): void {
    
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          return ['AGENDADO', 'CONFIRMADO'].includes(item.status);
        });
      }
    })
    
  }

  delete(id: number): void {
    if(confirm('Deseja realmente cancelar o agendamento?')){
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  updateStatus(id: number): void{
    if(confirm('Confirma alteração no status do agendamento?')){
      this.servico.updateStatus(id).subscribe({
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
