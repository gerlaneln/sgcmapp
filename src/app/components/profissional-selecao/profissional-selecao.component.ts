import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profissional } from 'src/app/models/profissional';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-profissional-selecao',
  templateUrl: './profissional-selecao.component.html',
  styles: [
  ]
})
export class ProfissionalSelecaoComponent implements OnInit {

  constructor(private servicoProfissional: ProfissionalService,
              private servicoAtendimento: AtendimentoService
              ) { }
  
  profissional: Profissional = <Profissional>{};
  profissionais: Profissional[] = Array<Profissional>();
  compareById = Utils.compareById;

  setFiltro(profissional: Profissional): void{
    let filtroId = profissional.id;
    this.servicoAtendimento.setFiltro(filtroId);
  }

  @Output() eventoFiltro = new EventEmitter();

  filtrar(profissional_id: number): void{
    this.servicoAtendimento.setFiltro(profissional_id);
    this.eventoFiltro.emit(profissional_id);
  }

  @Input() id: number = -1;

  
  getProfissional(id: number): void {
    if (id != -1) {
      this.servicoProfissional.getById(id).subscribe({
        next: (resposta: Profissional) => {
          this.profissional = resposta;
        }
      })
    } else {
      this.profissional = <Profissional>{};
    }

  }

  ngOnInit(): void {

    if (this.id != -1) {
      this.getProfissional(this.id);
    }
    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta;
      }
    })

  }

}
