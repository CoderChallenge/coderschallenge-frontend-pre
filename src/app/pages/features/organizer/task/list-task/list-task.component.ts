import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ChallengeService } from '@app/shared/services/challenge.service';
import { BaseComponent, routes } from '@app/shared';
import { ITaskList } from '@app/shared/common/model/ITask';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent extends BaseComponent implements OnInit {
  items: ITaskList[];
  challengeId: string;
  constructor(router: Router, activatedRoute: ActivatedRoute, titleService: Title, private challengeService: ChallengeService) {
    super(null, router, activatedRoute, titleService, challengeService );
  }
  ngOnInit() {
    this.titleRoute('List of challenges');
    this.filter.status = '';
    this.challengeId = this.getParamValue('id');
    this.init();
  }

  init() {
    this.waiting = true;
    this.url = `${routes.TASK.LIST}/${this.challengeId}`;
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
