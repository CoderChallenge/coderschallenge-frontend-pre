import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BaseComponent, routes } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IChallenge, IChallengeList } from '@app/shared/common/model/IChallenge';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-challenge',
  templateUrl: './list-challenge.component.html',
  styleUrls: ['./list-challenge.component.scss']
})
export class ListChallengeComponent extends BaseComponent implements OnInit {
items: IChallengeList[];
  private modalRef: NgbModalRef;
  constructor(router: Router, titleService: Title, private challengeService: ChallengeService,
              private modalService: NgbModal) {
    super(null, router, null, titleService, challengeService );
  }

  ngOnInit() {
    this.titleRoute('List of challenges');
    this.filter.status = '';
    this.init();
  }

  init() {
    this.waiting = true;
    this.url = routes.CHALLENGE.LIST;
    this.query = {
      size: this.paginationConfig.count,
      whereCondition: this.formatQueryString()
    };
    this.genPagination().subscribe(res => {
      this.waiting = false;
      this.items = res.data.data;
    }, (error: HttpErrorResponse) => {
      this.waiting = false;
      this.challengeService.showError(error.statusText);
    });
  }

  remove(item: IChallengeList, modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
          this.deleteChallenge(item);
     }, (reason) => {
    });
  }

  protected deleteChallenge(item: IChallengeList){
    this.waiting = true;
    this.challengeService.deleteChallenge(item.uid).subscribe(res => {
      this.waiting = false;
      this.init();
      this.challengeService.showSuccess(res.data);
      this.modalRef.close();
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }
}
