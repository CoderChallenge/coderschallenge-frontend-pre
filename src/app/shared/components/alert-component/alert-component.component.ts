import { Component, Input } from '@angular/core';
import { NotificationType } from '@app-shared/constant';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.css']
})
export class AlertComponentComponent{
  @Input() cssClass: string;
  @Input() message: string;
  @Input() iconClass: string;
  constructor() {}

}
