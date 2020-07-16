import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from '@pages/authentication/signup/signup.component';
import { CompleteSignupComponent } from '@pages/authentication/complete-signup/complete-signup.component';
import { LoginComponent } from '@pages/authentication/login/login.component';
import { ForgotPasswordComponent } from '@pages/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@pages/authentication/reset-password/reset-password.component';
import { RedirectSocialComponent } from '@pages/authentication/redirect-social/redirect-social.component';


const routes: Routes = [
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'redirect-social', component: RedirectSocialComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'complete-registration/:id', component: CompleteSignupComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'signup'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
