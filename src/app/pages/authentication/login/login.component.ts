import { Component, OnInit } from '@angular/core';
import { RouteRedirector } from '@pages/authentication/routeRedirector';
import { environment } from '@src/environments/environment';
import { AlertCssClass, IconCssClass, ILogin, Pages } from '@app/shared';
import { IAlert } from '@app/shared/common/model/IAlert';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Helpers } from '@app/shared/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { NgForm } from '@angular/forms';
import { AccountService } from '@app/shared/services/account.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends RouteRedirector implements OnInit {
  githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + environment.SOCIALCONFIG.GITHUB.CLIENT_ID + '&scope=user&redirect_uri=' + environment.SOCIALCONFIG.GITHUB.REDIRECT_URI;

  item: ILogin = {
    email: '',
    password: ''
  };
  loading = false;
  alert: IAlert;
  constructor( router: Router, private title: Title,
               private accountService: AccountService,
               private activatedRoute: ActivatedRoute,
               private dataService: DataStoreService,
               private authenticationService: AuthenticationService,
               private authService: SocialAuthService) {
    super(router);
  }


  ngOnInit(){
    this.destoryPageTracker();
    this.setTitle();

  }

  signInWithGoogle(){
    this.savePage();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginHandler(f: NgForm){
    this.alert = null;
    if (!f.valid) {
      this.alert = Helpers.setupAlert(AlertCssClass.warning, IconCssClass.warning, 'Email and Password is required');
      return false;
    }
    this.loading = true;
    this.makeLoginRequest(this.item);
  }

  savePage(){
    this.dataService.keepData('page', Pages.login);
  }

  private makeLoginRequest(body: ILogin){

    this.accountService.login(body)
        .subscribe((res) => {
          this.dataService.keepData('token', res.data.token);
          const {isActive, isVerified, role} = this.authenticationService;
          if (!isActive && !isVerified){
            this.router.navigate(['/auth/complete-registration', this.authenticationService.uid]);
          }
          this.redirectUserToDashboard(role);

        }, error => {
          this.loading = false;
          this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
        });
  }

  protected setTitle(){
    this.title.setTitle('Login Page');
  }

  protected destoryPageTracker(){
    const page = this.dataService.getData('page');
    if (page) { this.dataService.removeData('page'); }
  }
}
