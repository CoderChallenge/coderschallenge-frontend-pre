import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IChallengeList } from '@app/shared/common/model/IChallenge';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmitService } from '@app/shared/services/emit.service';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { BaseComponent } from '@app/shared';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss']
})
export class ChallengeCardComponent extends BaseComponent implements OnInit {
  @Input() items: IChallengeList[];
  @Input() waiting = false;
  constructor(router: Router,   private modalService: NgbModal,
              private emitService: EmitService, private challengeService: ChallengeService) {
    super(null, router, null, null, challengeService);
  }

  ngOnInit() {
  }

}
