import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '@app/shared/components/layouts/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/signup',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
