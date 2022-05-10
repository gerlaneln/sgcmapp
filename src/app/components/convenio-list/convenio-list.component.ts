import { Component, OnInit } from '@angular/core';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-convenio-list',
  templateUrl: './convenio-list.component.html',
  styles: [
  ]
})
export class ConvenioListComponent implements OnInit, IComponentList<Convenio> {

  constructor(private servico: ConvenioService) { }

  registros: Convenio[] = Array<Convenio>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Convenio[]) => {
        this.registros = resposta;
      }
    })
  }
  delete(id: number): void {
    if(confirm('Confirma exclusão deste convênio?')){
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
