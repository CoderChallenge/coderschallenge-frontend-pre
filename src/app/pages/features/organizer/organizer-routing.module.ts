import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@pages/features/organizer/dashboard/dashboard.component';
import { ChallengeComponent } from '@pages/features/organizer/challenge/challenge.component';
import { CreateChallengeComponent } from '@pages/features/organizer/challenge/create-challenge/create-challenge.component';
import { ChallengeConfigComponent } from '@pages/features/organizer/challenge/challenge-config/challenge-config.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'challenge',
    component: ChallengeComponent,
    children: [
      {
        path: 'create',
        component: CreateChallengeComponent
      },
      {
        path: 'config/:id',
        component: ChallengeConfigComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
