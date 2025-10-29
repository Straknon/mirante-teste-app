import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventosComponent } from './eventos/eventos.component';
import { EditComponent } from './eventos/edit/edit.component'; 
import { AddComponent } from './eventos/add/add.component';
import { ViewComponent } from './eventos/view/view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: { title: 'Home' }},
  { path: 'eventos', component: EventosComponent, data: { title: 'Evento' }},
  { path: 'eventos/:id/edit', component: EditComponent, data: { title: 'Editar' }},
  { path: 'eventos/new', component: AddComponent, data: { title: 'Criar' }},
  { path: 'eventos/:id', component: ViewComponent, data: { title: 'Visualizar' }},
   // otherwise redirect to home
   { path: '**', redirectTo: 'home' }];
