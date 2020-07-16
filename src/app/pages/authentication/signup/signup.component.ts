import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AlertCssClass, IAccount, IconCssClass, ISocialAuthentication, Pages } from '@app/shared';
import { Helpers } from '@app/shared/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlert } from '@app/shared/common/model/IAlert';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { NgForm } from '@angular/forms';
import { AccountService } from '@app/shared/services/account.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { environment } from '@src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user: SocialUser;
  githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + environment.SOCIALCONFIG.GITHUB.CLIENT_ID + '&scope=user&redirect_uri=' + environment.SOCIALCONFIG.GITHUB.REDIRECT_URI;

  item: IAccount = {
    name: '',
    email: '',
    nickName: '',
    password: '',
    phoneNumber: '',
    type: ''
  };
  loading = false;
  alert: IAlert;

  constructor(private authService: SocialAuthService,
              private accountService: AccountService,
              private dataService: DataStoreService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(){
    this.destoryPageTracker();
    this.githubCallbackHandler();
    this.googleCallbackHandler();
  }

  signInWithGoogle(){
    this.savePage();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  private githubCallbackHandler(){
    const code = this.getQueryString('code');
    if (!code) { return; }
    this.makeSocialRequest({provider: 'github', code});
  }

  private googleCallbackHandler(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (!this.user) { return; }
      this.makeSocialRequest({provider: 'google', token: this.user.idToken});
    });
  }

  protected makeSocialRequest(body: ISocialAuthentication){
    this.accountService.socialAuthentication(body).subscribe(res => {
      this.dataService.keepData('token', res.data.token);
      this.router.navigate(['/auth/complete-registration', this.authenticationService.uid]);
    }, error => {
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }

  signupHandler(f: NgForm){
    this.alert = null;
    if (!f.valid) { return; }
    this.loading = true;
    this.item.type = 'Participant';
    this.accountService.register(this.item).subscribe(res => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.success, IconCssClass.success, 'Account created successfully, Please check your email to complete your registration');
    }, error => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }
  savePage(){
    this.dataService.keepData('page', Pages.signup);
  }

  private getQueryString(key: string): string {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }

  protected destoryPageTracker(){
    const page = this.dataService.getData('page');
    if (page) { this.dataService.removeData('page'); }
  }
}
