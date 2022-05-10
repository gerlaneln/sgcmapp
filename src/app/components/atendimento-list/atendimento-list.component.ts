import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/models/atendimento';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements OnInit, IComponentList<Atendimento> {

  constructor(private servico: AtendimentoService) { }

  registros: Atendimento[] = Array<Atendimento>();

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
        }
      })
    }
  }

  ngOnInit(): void {
    this.get();
  }

}
