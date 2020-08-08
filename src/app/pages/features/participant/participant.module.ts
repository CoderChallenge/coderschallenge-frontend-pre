import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantRoutingModule } from './participant-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '@app/shared/components/shared-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupChallengeComponent } from './signup-challenge/signup-challenge.component';
import { ListComponent } from './challenge/list/list.component';


@NgModule({
  declarations: [DashboardComponent, SignupChallengeComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    NgbModule,
    ParticipantRoutingModule
  ]
})
export class ParticipantModule { }
