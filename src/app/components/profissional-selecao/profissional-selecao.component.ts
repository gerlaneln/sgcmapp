import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profissional } from 'src/app/models/profissional';
import { FiltrarService } from 'src/app/services/filtrar.service';
import { ProfissionalService } from 'src/app/services/profissional.service';

@Component({
  selector: 'app-profissional-selecao',
  templateUrl: './profissional-selecao.component.html',
  styles: [
  ]
})
export class ProfissionalSelecaoComponent implements OnInit {

  constructor(private servicoProfissional: ProfissionalService,
              private servicoFiltro: FiltrarService
              ) { }
  
  profissional: Profissional = <Profissional>{};
  profissionais: Profissional[] = Array<Profissional>();

  @Output() eventoFiltro = new EventEmitter();

  filtrar(form: NgForm): void{
    console.log(this.profissional);
    this.eventoFiltro.emit(this.profissional.id);
  }

  ngOnInit(): void {

    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta;
      }
    })
  }

}
