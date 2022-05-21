import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente';
import { AlertaService } from 'src/app/services/alerta.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { IComponentList } from '../i-component-list';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styles: [
  ]
})
export class PacienteListComponent implements OnInit, IComponentList<Paciente> {

  constructor(private servico: PacienteService,
              private servicoAlerta: AlertaService
            ) { }

  registros: Paciente[] = Array<Paciente>();

  grupoSanguineo : any = 
  {'A_POSITIVO': 'A+', 'A_NEGATIVO': 'A-',
  'B_POSITIVO': 'B+', 'B_NEGATIVO': 'B-',
  'AB_POSITIVO': 'AB+', 'AB_NEGATIVO': 'AB-',
  'O_POSITIVO': 'O+', 'O_NEGATIVO': 'O-'};

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next:(resposta: Paciente[]) => {
        this.registros = resposta;
      }
    })
  }
  delete(id: number): void {
    if(confirm('Confirma a exclusão deste paciente?')){
      this.servico.delete(id).subscribe({
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
