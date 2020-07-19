import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '@pages/features/admin/dashboard/dashboard.component';
import { TrackComponent } from '@pages/features/admin/track/track.component';
import { LevelComponent } from '@pages/features/admin/level/level.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'track',
    component: TrackComponent
  },
  {
    path: 'level',
    component: LevelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
