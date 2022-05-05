import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgendaListComponent } from './components/agenda-list/agenda-list.component';
import { AgendaFormComponent } from './components/agenda-form/agenda-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaListComponent,
    AgendaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
