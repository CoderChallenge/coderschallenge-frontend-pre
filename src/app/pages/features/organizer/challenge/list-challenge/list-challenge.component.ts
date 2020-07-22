import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BaseComponent, routes } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { IChallenge, IChallengeList } from '@app/shared/common/model/IChallenge';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-challenge',
  templateUrl: './list-challenge.component.html',
  styleUrls: ['./list-challenge.component.scss']
})
export class ListChallengeComponent extends BaseComponent implements OnInit {
items: IChallengeList[];
  constructor(router: Router, titleService: Title, private challengeService: ChallengeService, private modalService: NgbModal) {
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

  remove(item, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
    }, (reason) => {
    });
  }

}
