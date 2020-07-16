import { Component, OnInit } from '@angular/core';
import { AlertCssClass, IconCssClass } from '@app/shared';
import { Helpers } from '@app/shared/helpers';
import { IAlert } from '@app/shared/common/model/IAlert';
import { NgForm } from '@angular/forms';
import { AccountService } from '@app/shared/services/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent  {
  item = {
    email: ''
  };
  loading = false;
  alert: IAlert;
  constructor(private accountService: AccountService) { }

  forgotPasswordHandler(f: NgForm){
    this.alert = null;
    if (!f.valid) {
      this.alert = Helpers.setupAlert(AlertCssClass.warning, IconCssClass.warning, 'Email is required');
      return false;
    }
    this.loading = true;
    this.accountService.forgotPassword(this.item).subscribe(res => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.success, IconCssClass.success, res.data);
    }, error => {
      this.loading = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }




}
