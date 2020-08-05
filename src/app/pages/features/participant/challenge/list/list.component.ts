import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { BaseComponent, routes } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { IChallengeList } from '@app/shared/common/model/IChallenge';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  items: IChallengeList[];
  constructor(router: Router, titleService: Title, private challengeService: ChallengeService) {
    super(null, router, null, titleService, challengeService);
  }
  ngOnInit() {
    this.titleRoute('List of challenge');
    this.init();
  }

  init(){
    this.waiting = true;
    this.url = routes.PARTICIPANT.LIST;
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


}
