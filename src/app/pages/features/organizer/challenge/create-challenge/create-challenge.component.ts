import { Component } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AlertCssClass, BaseComponent, IconCssClass, routes } from '@app/shared';
import { FileService } from '@app/shared/services/file.service';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { Helpers } from '@app/shared/helpers';
import { IChallenge } from '@app/shared/common/model/IChallenge';
import { Router } from '@angular/router';
import { Utils } from '@src/app/shared/utils';
import { environment } from '@src/environments/environment';
import { IAlert } from '@app/shared/common/model/IAlert';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.scss']
})
export class CreateChallengeComponent extends BaseComponent {
  filename: any;
  fileError: boolean;
  isImage: boolean;
  formData = new FormData();
  item: IChallenge = {
    title: '',
    challengeImage: '',
    description: '',
    end_date: '',
    start_date: ''
  };
  constructor(router: Router,
              private fileService: FileService,
              private challengeService: ChallengeService
  ) {
    super(null, router, null, null, fileService);
  }


  submitForm(){
    this.alert = null;
    this.waiting = true;
    const file = this.formData.get('file') as File;
    if (file && file.size > 0) {
      this.uploadImage(this.formData);
    } else {
      this.createChallenge(this.item);
    }

  }

  onFileChange(event) {
    this.alert = null;
    const file = event.target.files[0];
    this.filename = file.name;
    if (!Utils.isValidFileSize(file)){
      this.fileError = true;
      this.alert = Helpers.setupAlert(AlertCssClass.warning, IconCssClass.warning, 'File size is too large');
      return false;
    }
    if (!Utils.fileValidator(file, true)) {
      this.fileError = true;
      this.alert = Helpers.setupAlert(AlertCssClass.warning, IconCssClass.warning, 'File format not valid, only file with png,jpg is allowed');
      return false;
    }
    this.isImage = true;
    this.fileError = false;
    if (event.target.files.length > 0) {
      this.formData.append('file', file);
      this.formData.append('api_key', environment.CLOUDINARYKEY.API_KEY);
      this.formData.append('upload_preset', environment.CLOUDINARYKEY.UPLOAD_PRESET);
    }
  }

  protected uploadImage(formData: FormData){
    this.fileService.uploadFileToCloud(formData, routes.CLOUDINARY).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.Response:
              this.item.challengeImage = event.body.secure_url;
              this.createChallenge(this.item);
              break;
          }
        }, error => {
          this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
          return false;
        });
  }

  private createChallenge(body: IChallenge){
    this.challengeService.createChallenge(body).subscribe(res => {
      this.waiting = false;
      // Stage 2 route
      this.goToNav('/organizer/complete-challenge-creation');
    }, error => {
      this.waiting = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }
}
