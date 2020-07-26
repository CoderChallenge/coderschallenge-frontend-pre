import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@pages/features/organizer/dashboard/dashboard.component';
import { SignupChallengeComponent } from '@pages/features/participant/signup-challenge/signup-challenge.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
