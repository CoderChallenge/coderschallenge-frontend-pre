import { Component, OnInit } from '@angular/core';
import { ISocialAuthentication, Pages } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteRedirector } from '@pages/authentication/routeRedirector';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { AccountService } from '@app/shared/services/account.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-redirect-social',
  templateUrl: './redirect-social.component.html',
  styleUrls: ['./redirect-social.component.scss']
})
export class RedirectSocialComponent extends RouteRedirector implements OnInit {
  user: SocialUser;
  constructor(private dataService: DataStoreService,
              private authService: SocialAuthService,
              private accountService: AccountService,
              router: Router,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute
  ) {
    super(router);
  }

  ngOnInit(){
    this.githubCallbackHandler();
    this.googleCallbackHandler();
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
      this.validateRedirection();
    }, error => {
      this.router.navigate(['/auth/login']);
    });
  }

  protected getQueryString(key: string): string {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }

  protected validateRedirection(){
    const {isActive, isVerified, role, uid} = this.authenticationService;
    const page = this.dataService.getData('page');
    if (page === Pages.signup) {
      this.redirectToCompleteRegistrationPage(uid);
    }else if (page === Pages.login){
      if (!isActive && !isVerified){
        this.redirectToCompleteRegistrationPage(uid);
      }else{
        // Check role and route to page based on the role
        this.redirectUserToDashboard(role);
      }
    }
  }
}
