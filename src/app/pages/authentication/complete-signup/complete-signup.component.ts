import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Helpers } from '@app/shared/helpers';
import { IAlert } from '@app/shared/common/model/IAlert';
import { AlertCssClass, IconCssClass, ISignupComplete, UserTypes } from '@app/shared';
import { RouteRedirector } from '@pages/authentication/routeRedirector';
import { DataStoreService } from '@app/shared/services/data-store.service';
import { NgForm } from '@angular/forms';
import { AccountService } from '@app/shared/services/account.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-complete-signup',
  templateUrl: './complete-signup.component.html',
  styleUrls: ['./complete-signup.component.scss']
})
export class CompleteSignupComponent extends RouteRedirector implements OnInit {

  item: ISignupComplete = {
    companyName: '',
    gender: '',
    purpose: '',
    userType: '',
    uid: ''
  };
  loading = false;
  alert: IAlert;
  constructor(router: Router, private accountService: AccountService,
              private dataService: DataStoreService,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute) {
    super(router);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.item.uid = param.get('id');
    });
  }

  submitForm(f: NgForm){
    this.alert = null;
    if (!f.valid) { return; }
    this.loading = true;
    if (!this.item.uid) {
      // TODO:: Return to 404 page;
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error,  'User identity does not exist');
      return false;
    }
    this.item.companyName = this.item.userType === UserTypes.participant ? '' : this.item.companyName;
    // Get User Data from store
    const { token } = this.authenticationService;
    this.accountService.completeSignup(this.item).subscribe(res => {
      this.loading = false;
      if (token){
        // This shows that the user has been authenticated already via social login, but role not set in the token.
        this.redirectUserToDashboard(this.item.userType);

      }
      this.router.navigate(['/auth/login']);
    }, error => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }
}
