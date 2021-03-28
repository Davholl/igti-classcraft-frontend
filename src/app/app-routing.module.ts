import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvatarDetalheComponent } from './avatar-detalhe/avatar-detalhe.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonagensComponent } from './personagens/personagens.component';

const routes: Routes = [
  { path: 'turma', component: PersonagensComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'avatar/:id', component: AvatarDetalheComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
