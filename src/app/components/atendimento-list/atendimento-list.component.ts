import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento';
import { AlertaService } from 'src/app/services/alerta.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements OnInit, IComponentList<Atendimento> {

  constructor(private servico: AtendimentoService,
              private servicoAlerta: AlertaService
            ) { }

  registros: Atendimento[] = Array<Atendimento>();

  filtrar(id: number): void{ //Pega os atendimentos filtrados por profissional
    if(id == -1){
      this.get();
    }else{
      this.servico.filtrar(id).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta;
      }
    })
    }
  }

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          return ['CHEGADA', 'ATENDIMENTO'].includes(item.status);
        })
      }
    })
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
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
    let id_profissional = this.servico.getFiltro(); //Pega o valor salvo no storage
    console.log(id_profissional);
    if(id_profissional > 0){
      console.log(id_profissional);
      this.filtrar(id_profissional);
    }else{
      this.get();
    }
  }

}
