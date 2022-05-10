import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Unidade } from 'src/app/models/unidade';
import { UnidadeService } from 'src/app/services/unidade.service';
import { IComponentForm } from '../i-component-form';

@Component({
  selector: 'app-unidade-form',
  templateUrl: './unidade-form.component.html',
  styles: [
  ]
})
export class UnidadeFormComponent implements OnInit, IComponentForm<Unidade> {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private servico: UnidadeService
            ) { }

  registro: Unidade = <Unidade>{};

  submit(form: NgForm): void {
    if(this.registro.id){
      this.servico.update(this.registro).subscribe({
        complete: () => {
          this.router.navigate(['config/unidades']);
        }
      })
    }else{
      this.servico.insert(this.registro).subscribe({
        complete: () => {
          form.resetForm();
        }
      })
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.queryParamMap.get('id');
    if(id){
      this.servico.getById(+id).subscribe({
        next: (resposta: Unidade) => {
          this.registro = resposta;
        }
      })
    }
  }

}
