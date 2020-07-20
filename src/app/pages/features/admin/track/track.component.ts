import { Component, OnInit } from '@angular/core';
import { BaseComponent, notifications, routes } from '@app/shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ITrack } from '@app/shared/common/model/ITrack';
import { NgForm } from '@angular/forms';
import { TrackService } from '@app/shared/services/track.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent extends BaseComponent implements OnInit {
  edit: boolean;
  item: ITrack = {name: '', id: 0};
  private modalRef: NgbModalRef;
  constructor( private modalService: NgbModal, private trackService: TrackService) {
    super(null, null, null, null, trackService);
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.waiting = true;
    this.url = routes.TRACK.LIST;
    this.query = {
      size: this.paginationConfig.count,
      whereCondition: this.formatQueryString()
    };
    this.genPagination().subscribe(res => {
      this.waiting = false;
      this.items = res.data.data;
    }, (error: HttpErrorResponse) => {
      this.waiting = false;
      this.trackService.showError(error.statusText);
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

  createTrack(f: NgForm) {
      this.waiting = true;
      this.trackService.createTrack(this.item).subscribe(res => {
        this.trackService.showSuccess('Created successfully');
        this.modalRef.close();
        f.reset();
        this.waiting = false;
        this.reloadComponent();
      }, error => {
        this.trackService.showError(error);
        this.waiting = false;
      });
  }

  updateTrack(f: NgForm) {
      this.waiting = true;
      this.trackService.EditTrack(this.item).subscribe((res) => {
        this.waiting = false;
        this.modalRef.close();
        this.trackService.showSuccess(res.data);
      }, error => {
        this.trackService.showError(error);
        this.waiting = false;
      });
  }
}
