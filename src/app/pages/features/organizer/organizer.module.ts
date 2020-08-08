import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OrganizerRoutingModule } from './organizer-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { CreateChallengeComponent } from './challenge/create-challenge/create-challenge.component';
import { ChallengeConfigComponent } from './challenge/challenge-config/challenge-config.component';
import { SharedComponentsModule } from '@app/shared/components/shared-components.module';
import { ListChallengeComponent } from './challenge/list-challenge/list-challenge.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { TaskComponent } from './task/task.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { DetailComponent } from './challenge/detail/detail.component';
import { EditChallengeComponent } from './challenge/edit-challenge/edit-challenge.component';


@NgModule({
  declarations: [
      DashboardComponent,
      ChallengeComponent,
      CreateChallengeComponent,
      ChallengeConfigComponent,
      ListChallengeComponent,
      CreateTaskComponent,
      TaskComponent,
      ListTaskComponent,
      DetailComponent,
      EditChallengeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    NgbModule,
    OrganizerRoutingModule,
  ],
    providers: [NgbActiveModal]
})
export class OrganizerModule { }
