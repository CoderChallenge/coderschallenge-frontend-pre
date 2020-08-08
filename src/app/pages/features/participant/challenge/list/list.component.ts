import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

import { BaseComponent, routes } from '@app/shared';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { IChallengeList } from '@app/shared/common/model/IChallenge';
import { EmitService } from '@app/shared/services/emit.service';
import { AuthenticationService } from '@app/shared/services/authentication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  items: IChallengeList[];
   userType: string;
  constructor(router: Router, titleService: Title, private emitService: EmitService,
              private authService: AuthenticationService,
              private challengeService: ChallengeService) {
    super(null, router, null, titleService, challengeService);
  }
  ngOnInit() {
    this.titleRoute('List of challenge');
    this.init();
    this.userType = this.authService.role;
  }

  init(filter?: any) {
    this.filter = filter ? filter : {};
    this.waiting = true;
    this.url = routes.PARTICIPANT.LIST;
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

}
