import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IChallengeDetail } from '@app/shared/common/model/IChallenge';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {
item: IChallengeDetail;
challengeId: string;
  constructor(router: Router, activatedRoute: ActivatedRoute, titleService: Title, private challengeService: ChallengeService) {
    super(null, router, activatedRoute , titleService, challengeService );
  }

  async ngOnInit() {
    this.challengeId = this.getParamValue('id');
    await this.getChallengeDetail();
  }

  async getChallengeDetail(){
    this.waiting = true;
    this.challengeService.getChallengeDetail(this.challengeId).subscribe(res => {
      this.item = res.data;
      this.waiting = false;
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }

  copyText(inputElement: HTMLInputElement){
    /* Select the text field */
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

   encodedText(text: string): string{
     return encodeURIComponent(text);
  }

  get appUrl(){
    return window.location.href;
  }
}
