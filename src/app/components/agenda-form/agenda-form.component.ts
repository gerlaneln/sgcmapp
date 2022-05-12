import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/models/atendimento';
import { Convenio } from 'src/app/models/convenio';
import { Paciente } from 'src/app/models/paciente';
import { Profissional } from 'src/app/models/profissional';
import { AlertaService } from 'src/app/services/alerta.service';
import { AtendimentoService } from 'src/app/services/atendimento.service';
import { ConvenioService } from 'src/app/services/convenio.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { Utils } from 'src/app/utils/utils';
import { IComponentForm } from '../i-component-form';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styles: [
  ]
})
export class AgendaFormComponent implements OnInit, IComponentForm<Atendimento> {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private servicoAlerta: AlertaService,
              private servico: AtendimentoService,
              private servicoProfissional: ProfissionalService,
              private servicoConvenio: ConvenioService,
              private servicoPaciente: PacienteService
            ) { }
  horariosClinica: String[] = ['14:00:00', '14:30:00',
                    '15:00:00', '15:30:00',
                    '16:00:00', '16:30:00',
                    '17:00:00', '17:30:00',
                    '18:00:00', '18:30:00',
                    '19:00:00', '19:30:00',
                    '20:00:00']; 
  horarios: String[] = Array<String>();
  horariosDisponiveis: String[] = Array<String>();
  registro: Atendimento = <Atendimento>{};
  profissionais: Profissional[] = Array<Profissional>();
  convenios: Convenio[] = Array<Convenio>();
  pacientes: Paciente[] = Array<Paciente>();
  compareById = Utils.compareById;
  compareHorario = Utils.compareHorario;

  // let r1 = [2,4,6,8];
  // let r2 = [3,4,5,7,9];       
  // let r3 = r1.filter( a => !r2.includes( a ) );

  // List<String> registros = atendimentos.stream()
  // .filter(item -> item.getStatus() != EStatusAtendimento.CANCELADO)
  // .map(item -> item.getHora().toString())
  // .collect(Collectors.toList());

  horariosPermitidos(hClinica: String[], hProfissional: String[]): String[]{
    hClinica.forEach(item => {
      if(!hProfissional.includes(item) || item == this.registro.hora){
         this.horariosDisponiveis.push(item);
      }
    });
    return this.horariosDisponiveis;
  }

  submit(form: NgForm): void {

    let data = new Date(this.registro.data);
    data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
    let registroModificado = Object.assign({}, this.registro);
    registroModificado.data = data.toISOString();

    if(this.registro.id){
      this.servico.update(registroModificado).subscribe({
        complete: () => {
          this.router.navigate(['/agenda']);
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }else{
      this.servico.insert(registroModificado).subscribe({
        complete: () => {
          form.resetForm();
          this.servicoAlerta.enviarAlertaSucesso();
        }
      })
    }
  }

  getHorarios(id: number, dataString: string): void {
    let data = new Date(dataString);
    data = new Date(data.getTime() + data.getTimezoneOffset() * 60 * 1000);
    this.servico.getHorarios(id, data.toISOString().slice(0, 10)).subscribe({
      next: (resposta: String[]) => {
        this.horarios = this.horariosPermitidos(this.horariosClinica, resposta);
        console.log(this.horarios);
      }
    })
  }

  ngOnInit(): void {

    console.log(this.horarios);

    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta;
      }
    })

    this.servicoConvenio.get().subscribe({
      next: (resposta: Convenio[]) => {
        this.convenios = resposta;
      }
    })

    this.servicoPaciente.get().subscribe({
      next: (resposta: Paciente[]) => {
        this.pacientes = resposta;
      }
    })

    const id = this.route.snapshot.queryParamMap.get('id');
    if(id){
      this.servico.getById(+id).subscribe({
        next: (resposta: Atendimento) => {
          this.registro = resposta;
          this.getHorarios(this.registro.id, this.registro.data);
        }
      })
    }

  }

}
