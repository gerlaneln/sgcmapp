import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaFormComponent } from './components/agenda-form/agenda-form.component';
import { AgendaListComponent } from './components/agenda-list/agenda-list.component';
import { AtendimentoListComponent } from './components/atendimento-list/atendimento-list.component';
import { ConvenioFormComponent } from './components/convenio-form/convenio-form.component';
import { ConvenioListComponent } from './components/convenio-list/convenio-list.component';
import { EspecialidadeFormComponent } from './components/especialidade-form/especialidade-form.component';
import { EspecialidadeListComponent } from './components/especialidade-list/especialidade-list.component';
import { UnidadeFormComponent } from './components/unidade-form/unidade-form.component';
import { UnidadeListComponent } from './components/unidade-list/unidade-list.component';

const routes: Routes = [
  { path: 'agenda', component: AgendaListComponent },
  { path: 'agenda/form', component: AgendaFormComponent },
  { path: 'atendimento', component: AtendimentoListComponent },
  { path: 'convenio', component: ConvenioListComponent },
  { path: 'convenio/form', component: ConvenioFormComponent },
  { path: 'config/especialidades', component: EspecialidadeListComponent },
  { path: 'config/especialidades/form', component: EspecialidadeFormComponent },
  { path: 'config/unidades', component: UnidadeListComponent },
  { path: 'config/unidades/form', component: UnidadeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
