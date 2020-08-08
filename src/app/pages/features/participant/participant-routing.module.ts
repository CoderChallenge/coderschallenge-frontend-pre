import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@pages/features/participant/dashboard/dashboard.component';
import { ListComponent } from '@pages/features/participant/challenge/list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'challenges',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
