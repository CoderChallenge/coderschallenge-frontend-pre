import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedComponentsModule } from '@app/shared/components/shared-components.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CompleteSignupComponent } from './complete-signup/complete-signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RedirectSocialComponent } from './redirect-social/redirect-social.component';


@NgModule({
  declarations: [
  LoginComponent,
  SignupComponent,
  CompleteSignupComponent,
  ResetPasswordComponent,
  ForgotPasswordComponent,
  RedirectSocialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
