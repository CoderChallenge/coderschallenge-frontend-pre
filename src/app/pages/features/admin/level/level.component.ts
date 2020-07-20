import { Component, OnInit } from '@angular/core';
import { ITrack } from '@app/shared/common/model/ITrack';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent, notifications, routes } from '@app/shared';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LevelService } from '@app/shared/services/level.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent extends BaseComponent implements OnInit {
  edit: boolean;
  item: ITrack = {name: '', id: 0};
  private modalRef: NgbModalRef;
  constructor( private modalService: NgbModal, private levelService: LevelService) {
    super(null, null, null, null, levelService);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.waiting = true;
    this.url = routes.LEVEL.LIST;
    this.query = {
      size: this.paginationConfig.count,
      whereCondition: this.formatQueryString()
    };
    this.genPagination().subscribe(res => {
      this.waiting = false;
      this.items = res.data.data;
    }, (error: HttpErrorResponse) => {
      this.waiting = false;
      this.levelService.showError(error.statusText);
    });
  }

  open(content, item = null) {
    this.edit = false;
    if (item) { this.edit = true; this.item = item; } else { this.item = {name: '', id: 0}; }
    this.modalRef  = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'});
    this.modalRef.result.then((result) => {
      // console.log(result);
    }, (reason) => {
      // console.log('Err!', reason);
    });
  }


  remove(item, modal) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
        .result.then((result) => {
    }, (reason) => {
    });
  }

  createLevel(f: NgForm) {
    this.waiting = true;
    this.levelService.createLevel(this.item).subscribe(res => {
      this.levelService.showSuccess('Created successfully');
      this.modalRef.close();
      f.reset();
      this.waiting = false;
      this.reloadComponent();
    }, error => {
      this.levelService.showError(error);
      this.waiting = false;
    });
  }

  updateLevel(f: NgForm) {
    this.waiting = true;
    this.levelService.EditLevel(this.item).subscribe((res) => {
      this.waiting = false;
      this.modalRef.close();
      this.levelService.showSuccess(res.data);
    }, error => {
      this.levelService.showError(error);
      this.waiting = false;
    });
  }
}
