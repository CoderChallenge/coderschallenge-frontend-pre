import { Component, OnInit } from '@angular/core';
import { BaseComponent, ISignupComplete } from '@app/shared';
import { IAlert } from '@app/shared/common/model/IAlert';
import { NgForm } from '@angular/forms';
import { IChallengeDetail, IJoinChallenge } from '@app/shared/common/model/IChallenge';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-challenge',
  templateUrl: './signup-challenge.component.html',
  styleUrls: ['./signup-challenge.component.scss']
})
export class SignupChallengeComponent extends BaseComponent implements OnInit {
  item: IChallengeDetail;
  joinChallengeModel: IJoinChallenge = {
    levelId: 0,
    trackId: 0,
    challengeId: ''
};
  private modalRef: NgbModalRef;
  constructor(router: Router, activatedRoute: ActivatedRoute, titleService: Title,
              private challengeService: ChallengeService, private meta: Meta, private modalService: NgbModal) {
    super(null, router, activatedRoute , titleService, challengeService );
  }

  async ngOnInit() {
    this.joinChallengeModel.challengeId = this.getParamValue('id');
    await this.getChallengeDetail();
  }

  async getChallengeDetail(){
    this.waiting = true;
    this.challengeService.getChallengeDetail(this.joinChallengeModel.challengeId).subscribe(res => {
      this.item = res.data;
      this.meta.addTags([
        {name: 'og:title', content: this.item.title},
        {name: 'og:description', content: this.item.description},
        {name: 'og:image', content: this.item.image_url},
        {name: 'og:url', content: window.location.href}
      ]);
      this.waiting = false;
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }

  open(content, item = null) {
    this.modalRef  = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      // console.log(result);
    }, (reason) => {
      // console.log('Err!', reason);
    });
  }

  signupChallenge(f: NgForm) {
    this.challengeService.joinChallenge(this.joinChallengeModel).subscribe(res => {
      this.waiting = false;
      this.challengeService.showSuccess(res.data);
      this.item.hasRegistered = true;
      this.modalRef.close();
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }
}
