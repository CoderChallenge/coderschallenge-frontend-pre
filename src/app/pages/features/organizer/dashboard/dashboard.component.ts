import { Component, OnInit } from '@angular/core';
import { BaseComponent, routes } from '@app/shared';
import { Router } from '@angular/router';
import { DashboardService } from '@app/shared/services/dashboard.service';
import { Title } from '@angular/platform-browser';
import { IDashboard } from '@app/shared/common/model/IDashboard';
import { HttpErrorResponse } from '@angular/common/http';
import { ChallengeService } from '@app/shared/services/challenge.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
item: IDashboard;
  constructor(router: Router, titleService: Title, private dashboardService: DashboardService,
              private challengeService: ChallengeService) {
    super(null, router, null , titleService, challengeService);
  }

  ngOnInit() {
    this.init();
    this.waiting = true;
    this.dashboardService.organizer().subscribe(res => {
      this.waiting = false;
      this.item = res.data;
    }, error => {
      this.waiting = false;
      this.dashboardService.showError(error);
    });
  }

  init() {
    this.paginationConfig.count = 5;
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

}
