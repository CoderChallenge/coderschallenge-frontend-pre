import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertCssClass, IconCssClass } from '@app/shared';
import { Helpers } from '@app/shared/helpers';
import { IAlert } from '@app/shared/common/model/IAlert';
import { NgForm } from '@angular/forms';
import { AccountService } from '@app/shared/services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  item = {
    password: '',
    utoken: '',
    confirmpassword: ''
  };
  loading = false;
  alert: IAlert;
  constructor(private accountService: AccountService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.item.utoken = this.getQueryString('utoken');
  }
  resetPasswordHandler(f: NgForm){
    this.alert = null;
    const { utoken: userId, password} = this.item;
    if (!this.checkValidation(userId)) { return; }
    this.loading = true;
    this.accountService.resetPassword( {utoken: userId, password}).subscribe(res => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.success, IconCssClass.success, res.data);
    }, error => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }

  protected checkValidation(userId){
    if (!userId) {
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error,  'Reset password token does not exist');
      return false;
    }
    return true;
  }

  protected getQueryString(key: string): string {
    return this.activatedRoute.snapshot.queryParamMap.get(key);
  }
}
