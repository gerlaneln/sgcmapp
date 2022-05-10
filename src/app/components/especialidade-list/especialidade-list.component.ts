import { Component, OnInit } from '@angular/core';
import { Especialidade } from 'src/app/models/especialidade';
import { EspecialidadeService } from 'src/app/services/especialidade.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styles: [
  ]
})
export class EspecialidadeListComponent implements OnInit, IComponentList<Especialidade> {

  constructor(private servico: EspecialidadeService) { }

  registros: Especialidade[] = Array<Especialidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => {
        this.registros = resposta;
      }
    })
  }
  delete(id: number): void {
    if(confirm('Confirma exclusão desta especialidade?')){
      this.servico.delete(id).subscribe({
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
