import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

import { BaseComponent, routes } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { IChallengeList } from '@app/shared/common/model/IChallenge';
import { EmitService } from '@app/shared/services/emit.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-list-challenge',
  templateUrl: './list-challenge.component.html',
  styleUrls: ['./list-challenge.component.scss']
})
export class ListChallengeComponent extends BaseComponent implements OnInit {
items: IChallengeList[];
userType: string;
  private modalRef: NgbModalRef;
  constructor(router: Router, titleService: Title, private emitService: EmitService, private authService: AuthenticationService,
              private challengeService: ChallengeService,
              private modalService: NgbActiveModal) {
    super(null, router, null, titleService, challengeService );
  }

  ngOnInit() {
    this.titleRoute('List of challenges');
    this.filter.status = '';
    this.init();
    this.userType = this.authService.role;
  }

  init(filter?: any) {
    this.filter = filter ? filter : {};
    this.waiting = true;
    this.url = routes.CHALLENGE.LIST;
    this.query = {
      size: this.paginationConfig.count,
      whereCondition: this.formatQueryString()
    };
    this.genPagination().subscribe(res => {
      this.waiting = false;
      this.emitService.checkTotalCount(res.data.total);
      this.items = res.data.data;
    }, (error: HttpErrorResponse) => {
      this.waiting = false;
      this.challengeService.showError(error.statusText);
    });
  }

  count(event) {
    this.paginationConfig.count = event;
    this.init();
  }
  refresh(event?) {
    this.reloadComponent();
  }
  deleteChallenge(item: IChallengeList){
    this.waiting = true;
    this.challengeService.deleteChallenge(item.uid).subscribe(res => {
      this.waiting = false;
      this.init();
      this.challengeService.showSuccess(res.data);
      this.modalService.close();
    }, error => {
      this.waiting = false;
      this.challengeService.showError(error);
    });
  }
}
