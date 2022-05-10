import { Component, OnInit } from '@angular/core';
import { Unidade } from 'src/app/models/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styles: [
  ]
})
export class UnidadeListComponent implements OnInit, IComponentList<Unidade> {

  constructor(private servico: UnidadeService) { }

  registros: Unidade[] = Array<Unidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Unidade[]) => {
        this.registros = resposta;
      }
    })
  }
  delete(id: number): void {
    if(confirm('Confirma exclusão desta unidade?')){
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
