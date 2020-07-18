import { Component, OnInit } from '@angular/core';
import { AlertCssClass, BaseComponent, IconCssClass, routes } from '@app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '@app/shared/services/challenge.service';
import { Helpers } from '@app/shared/helpers';
import { IChallengeConfig } from '@app/shared/common/model/IChallenge';

@Component({
  selector: 'app-challenge-config',
  templateUrl: './challenge-config.component.html',
  styleUrls: ['./challenge-config.component.scss']
})
export class ChallengeConfigComponent extends BaseComponent implements OnInit {
  tracks: any;
  levels: any;
  item: IChallengeConfig = {
    challengeId: '',
    levelIds: [],
    trackIds: []
  };


  constructor(router: Router, activatedRoute: ActivatedRoute, private challengeService: ChallengeService) {
    super(null, router, activatedRoute, null, challengeService );
  }

  ngOnInit() {
    this.getAllConfigs();
    this.item.challengeId = this.getParamValue('id');
  }

  getAllConfigs(){
    this.waiting = true;
    this.getNameAndId(routes.TRACK.LIST).subscribe(res => this.tracks = res.data);
    this.getNameAndId(routes.LEVEL.LIST).subscribe(res => this.levels = res.data);
    this.waiting = false;
  }

  onCheckboxChange(event, value) {
    if (value === 'track'){
      if (event.target.checked) {this.checkedItems(event, this.item.trackIds); }
      if (!event.target.checked){this.unCheckItem(event, this.item.trackIds); }
    }else if (value === 'level'){
      if (event.target.checked) {this.checkedItems(event, this.item.levelIds); }
      if (!event.target.checked){this.unCheckItem(event, this.item.levelIds); }
    }
  }

  submitForm(){
    this.waiting = true;
    this.challengeService.attachLevelAndTrack(this.item).subscribe(res => {
      this.waiting = false;
      this.alert = Helpers.setupAlert(AlertCssClass.success, IconCssClass.success, res.data);
    }, error => {
      this.waiting = false;
      this.alert = Helpers.setupAlert(AlertCssClass.error, IconCssClass.error, error);
    });
  }

  protected checkedItems(event, items: Array<number>){
    items.push(Number(event.target.value));
  }

  protected unCheckItem(event, items: Array<number>){
    const value =  Number(event.target.value);
    if (items.find(x => x === value)) {
      items.splice(items.findIndex(x => x === value), 1);
    }

  }

}
