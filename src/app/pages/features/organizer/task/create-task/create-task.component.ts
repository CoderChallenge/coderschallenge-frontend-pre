import { Component, OnInit } from '@angular/core';
import { IChallenge, IChallengeFormDetail } from '@app/shared/common/model/IChallenge';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '@app/shared/services/file.service';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { Utils } from '@app/shared/utils';
import { Helpers } from '@app/shared/helpers';
import { AlertCssClass, BaseComponent, IconCssClass, routes } from '@app/shared';
import { environment } from '@src/environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TaskService } from '@app/shared/services/task.service';
import { ITask } from '@app/shared/common/model/ITask';
import { ILevel } from '@app/shared/common/model/ILevel';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent extends BaseComponent implements OnInit {
  filename: any;
  fileError: boolean;
  isImage: boolean;
  formData = new FormData();
  item: ITask = {
    title: '',
    attachment: '',
    description: '',
    track: 0,
    level: 0,
    forDay: 0,
    challengeId: '',
    point: 0
  };
  challengeDetail: IChallengeFormDetail;
  days: number[] = [];
  constructor(router: Router, activatedRoute: ActivatedRoute, titleService: Title,
              private fileService: FileService,
              private challengeService: ChallengeService,
              private taskService: TaskService) {
    super(null, router, activatedRoute, titleService, fileService);
  }

  ngOnInit(){
    this.titleRoute('Create a new task');
    this.item.challengeId = this.getParamValue('id');
    this.getChallengeDetail();
  }
  getChallengeDetail(){
    this.waiting = true;
    this.challengeService.getChallengeFormDetail(this.item.challengeId).subscribe(res => {
      this.challengeDetail = res.data;
      this.createArrayOfDays();
      this.waiting = false;
   }, error => {
     this.waiting = false;
     this.challengeService.errorAlert(error, 'error' );
   });
  }

   createArrayOfDays(): Array<number>{
    if (!this.challengeDetail && this.challengeDetail.timeline <= 0) { return this.days; }
    for (let i = 1; i <= this.challengeDetail.timeline; i++){
      this.days.push(i);
      }
    return this.days;
  }
  submitForm(){
    this.alert = null;
    this.waiting = true;
    const file = this.formData.get('file') as File;
    if (file && file.size > 0) {
      this.uploadImage(this.formData);
    } else {
      this.createTask(this.item);
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
              this.item.attachment = event.body.secure_url;
              this.createTask(this.item);
              break;
          }
        }, error => {
          this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
          return false;
        });
  }

  private createTask(body: ITask){
    this.taskService.createTask(body).subscribe(res => {
      this.waiting = false;
      this.goToNav('/organizer/task/list');
    }, error => {
      this.waiting = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }
}
