import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent, UserTypes } from '@app/shared';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { EmitService } from '@app/shared/services/emit.service';
import { IChallengeList } from '@app/shared/common/model/IChallenge';

@Component({
  selector: 'app-shared-challenge-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {
  @Input() items: IChallengeList[];
  @Output() filterAction = new EventEmitter<any>();
  @Output() reload = new EventEmitter<any>();
  @Output() sendData = new EventEmitter<any>();
  @Output() entryCount = new EventEmitter<any>();
  @Output() deleteChallenge = new EventEmitter<any>();
  @Input() waiting = false;
  @Input() role: string;
  private modalRef: NgbModalRef;
  constructor(router: Router,   private modalService: NgbModal,
              private emitService: EmitService, private challengeService: ChallengeService) {
    super(null, router, null, null, challengeService);
  }

  ngOnInit() {
    this.emitService.countSource$.subscribe((res) => {
      this.paginationConfig.total = res;
      this.paginationConfig.count = 10;
    });
  }
  refresh() {
    this.filter = {};
    this.reload.emit(true);
  }
  changeCount() {
    this.entryCount.emit(this.paginationConfig.count);
  }
  filterData() {
    this.filterAction.emit(this.filter);
  }
  getUserType(userTypes: number): string{
    let result = '';
    switch (userTypes) {
      case 1:
        result = UserTypes.admin;
        break;
      case 2:
        result = UserTypes.organizer;
        break;
      case 3:
        result = UserTypes.participant;
        break;
      default:
        result = '';
    }
    return result;
 }

  remove(item: IChallengeList, modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
      this.deleteChallenge.emit(item);
    }, (reason) => {
    });
  }

}
