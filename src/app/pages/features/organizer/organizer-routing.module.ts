import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@pages/features/organizer/dashboard/dashboard.component';
import { ChallengeComponent } from '@pages/features/organizer/challenge/challenge.component';
import { CreateChallengeComponent } from '@pages/features/organizer/challenge/create-challenge/create-challenge.component';
import { ChallengeConfigComponent } from '@pages/features/organizer/challenge/challenge-config/challenge-config.component';
import { ListChallengeComponent } from '@pages/features/organizer/challenge/list-challenge/list-challenge.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'organizer/dashboard',
    pathMatch: 'full'
  },
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
      {
        path: 'list',
        component: ListChallengeComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
