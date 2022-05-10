import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Convenio } from 'src/app/models/convenio';
import { ConvenioService } from 'src/app/services/convenio.service';
import { Utils } from 'src/app/utils/utils';
import { IComponentForm } from '../i-component-form';

@Component({
  selector: 'app-convenio-form',
  templateUrl: './convenio-form.component.html',
  styles: [
  ]
})
export class ConvenioFormComponent implements OnInit, IComponentForm<Convenio> {

  constructor(private route: ActivatedRoute,
              private router : Router,
              private servico: ConvenioService
            ) { }

  registro: Convenio = <Convenio>{};
  compareById = Utils.compareById;
  
  submit(form: NgForm): void {
    this.servico.update(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/convenio']);
      }
    })
  }
  
  ngOnInit(): void {

    const id = this.route.snapshot.queryParamMap.get('id');
    if(id){
      this.servico.getById(+id).subscribe({
        next: (resposta: Convenio) => {
          this.registro = resposta;
        }
      })
    }

  }

}
