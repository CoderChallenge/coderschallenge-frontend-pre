import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CreateChallengeComponent } from './challenge/create-challenge/create-challenge.component';
import { ChallengeConfigComponent } from './challenge/challenge-config/challenge-config.component';


@NgModule({
  declarations: [DashboardComponent, ChallengeComponent, CreateChallengeComponent, ChallengeConfigComponent],
  imports: [
    CommonModule,
    OrganizerRoutingModule
  ]
})
export class OrganizerModule { }
