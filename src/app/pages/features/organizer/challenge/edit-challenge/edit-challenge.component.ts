import { Component, OnInit } from '@angular/core';
import { IChallenge, IChallengeDetail } from '@app/shared/common/model/IChallenge';
import { BaseComponent, routes } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { Location } from '@angular/common';
import { Utils } from '@app/shared/utils';
import { environment } from '@src/environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileService } from '@app/shared/services/file.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-challenge',
  templateUrl: './edit-challenge.component.html',
  styleUrls: ['./edit-challenge.component.scss']
})
export class EditChallengeComponent extends BaseComponent implements OnInit {
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
  fileErrorMessage: string;
  private challengeId: string;
  constructor(location: Location, router: Router,
              activatedRoute: ActivatedRoute,
              titleService: Title,
              private challengeService: ChallengeService,
              private fileService: FileService) {
    super(location, router, activatedRoute, titleService, challengeService );
  }

  async ngOnInit() {
    this.titleRoute('Edit Challenge');
    this.challengeId = this.getParamValue('id');
    await this.getChallengeDetail();
  }

 async getChallengeDetail(){
    this.waiting = true;
    this.challengeService.getChallengeDetail(this.challengeId).subscribe(res => {
      this.waiting = false;
      this.item = res.data;
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }

  onFileChange(event) {
    this.alert = null;
    this.fileErrorMessage = '';
    const file = event.target.files[0];
    this.filename = file.name;
    if (!Utils.isValidFileSize(file)){
      this.fileError = true;
      this.fileErrorMessage = 'File size is too large';
      return false;
    }
    if (!Utils.fileValidator(file, true)) {
      this.fileError = true;
      this.fileErrorMessage = 'File format not valid, only file with png,jpg is allowed';
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

  submitForm(){
    this.alert = null;
    this.waiting = true;
    const file = this.formData.get('file') as File;
    if (file && file.size > 0) {
      this.uploadImage(this.formData);
    } else {
      this.updateChallenge(this.item);
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
              this.updateChallenge(this.item);
              break;
          }
        }, error => {
          this.challengeService.showError(error);
          return false;
        });
  }

  private updateChallenge(body: IChallenge){
    this.item.challengeImage = this.item.challengeImage ? this.item.challengeImage : '';
    const newBody = this.getRequestBody(body);
    this.challengeService.updateChallenge(newBody, this.challengeId).subscribe(res => {
      this.waiting = false;
      this.challengeService.showSuccess('Record has been updated successfully');
      this.goToNav(`/organizer/challenge/list`);
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }

  private getRequestBody(item: IChallenge): IChallenge{
    return {title: item.title, start_date: item.start_date,
      end_date: item.end_date, description: item.description,
      challengeImage: item.challengeImage};
  }
}
