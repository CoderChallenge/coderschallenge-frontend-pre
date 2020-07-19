import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '@app/shared/components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '@app/shared/components/layouts/admin-layout/admin-layout.component';
import { UserTypes } from '@app/shared';
import { AuthGuard } from '@app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'organizer',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: UserTypes.organizer
    },
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/features/organizer/organizer.module').then(m => m.OrganizerModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: UserTypes.admin
    },
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/features/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
