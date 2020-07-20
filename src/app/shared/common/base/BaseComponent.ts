import { Location } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  ParamMap,
} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators';

import { IComponentAction } from '@app-shared/common/base/IComponentAction';
import { IError } from '@app-shared/common/model/IError';
import { IQueryOptions, IFilter } from '@app-shared/common/interface/IQueryOptions';
import { IRootService } from '@app-shared/common/interface/IRootService';
import { IAlert } from '@app/shared/common/model/IAlert';
import { INameAndId } from '@app/shared/common/model/ILevel';
import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { Observable } from 'rxjs';




export abstract class BaseComponent implements IComponentAction, OnInit {
  private locker = '123_text_ec';
  selectedIds: any;
  selectedAll: any;
  checkedList: any[];
  masterSelected: any;
  constructor(
    public location?: Location,
    public router?: Router,
    public activatedRoute?: ActivatedRoute,
    public titleService?: Title,
    public resource?: IRootService<any>
  ) { }

  query: IQueryOptions;
  filterarray: IFilter[];
  waiting: boolean;
  url: any;
  items: any;
  item: any = {};
  exitem: any;
  alert: IAlert;
  notificationData: Array<any> = [];

  states: any;
  statuses: any;
  nameAndIds: INameAndId[];
  isUploading: boolean;
  error: IError = {
    Message: 'Error: No internet connection',
    isError: false,
  };

  hideFilter = false;
  size = 10;
  filter: any = {};
  changePage: () => void;
  paginationConfig = {
    count: this.size || 50,
    page: 1,
    total: 0,
  };
  sizes: Array<number> = [10, 20, 50, 100, 150, 200, 250];

  genders: Array<string> = ['Man', 'Woman'];

  months: Array<string> = [
    'January',
    'Feburary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  checkItems: any;
  pager: any = { page: 1, size: 10 };

  getParamValue(key: string): string {
    let value = '';
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      value = param.get(key);
    });
    return value;
  }
  goBack() {
    this.location.back();
  }
  go(route, id, isSecure = false) {
    const eid = isSecure ? this.secureData(id) : id;
    this.router.navigate([route, id]);
  }
  gotoRoute(route, id, other, isSecure = false) {
    const eid = isSecure ? this.secureData(id) : id;
    this.router.navigate([route, eid, other]);
  }
  goToNav(route) {
    this.router.navigate([route]);
  }
  // tslint:disable-next-line:no-shadowed-variable
  goTo(url: string) {
    this.router.navigateByUrl(url);
  }
  ngOnInit() { }
  reloadComponent() {
    this.filter = {};
    this.size = 10;
    this.ngOnInit();
  }

  secureData(value: any): string {
    // const dataStore: DataSaverService = this.resource.getService(DataSaverService);
    return CryptoJS.AES.encrypt(value, this.locker).toString();
  }
  unsecureData(value: any): string {
    // const dataStore: DataSaverService = this.resource.getService(DataSaverService);
    return CryptoJS.AES.decrypt(value, this.locker).toString();
  }

  titleRoute(title: string) {
    this.titleService.setTitle(title);
  }

  setupPagination() {
    this.waiting = true;
    return this.resource
      .query(
        Object.assign({
          count: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: JSON.stringify(this.filter),
        }),
        this.url
      )
      .subscribe(
        (res) => {
          this.waiting = false;
          this.paginationConfig.total = res.total;
          // this.resource.getService(EmitService).checkTotalCount(this.paginationConfig.total);
          this.items = res.data.items;
          this.hideFilter = false;
        },
        (error) => {
          this.waiting = false;
          this.resource.errorAlert(
            'An error occurred while loading resource',
            'Error'
          );
        }
      );
  }

  genPagination() {
    return this.resource
      .query(
        Object.assign({
          size: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: this.query.whereCondition,
        }),
        this.url
      )
      .pipe(
        map((res) => {
          this.paginationConfig.total = res.data.total;
          return res;
        })
      );
  }

  getPageInfoDescription(): string {
    if (this.items) {
      return (
        'Showing ' +
        (this.paginationConfig.count * (this.pager.page - 1) + 1) +
        ' to ' +
        (this.paginationConfig.count * (this.pager.page - 1) +
          this.items.length) +
        ' of ' +
        this.paginationConfig.total + ' records '
      );
    }
    return '';
  }

  pageChanged(event) {
    this.masterSelected = false;
    this.paginationConfig.page = event;
    this.waiting = true;
    return this.resource
      .query(
        Object.assign({
          size: this.paginationConfig.count,
          page: this.paginationConfig.page,
          orderByExpression: this.query.orderByExpression,
          whereCondition: this.formatQueryString(),
        }),
        this.url
      )
      .subscribe(
        (res) => {
          this.items = res.data.data;
          this.pager.page = this.paginationConfig.page;
          // this.paginationConfig.total = data.total;
          this.waiting = false;
        },
        (error) => {
          this.error.isError = true;
          this.error.Message = error.error.message;
          this.resource.errorAlert(error.error.message, 'Error');
          this.waiting = false;
        }
      );
  }

  toggleFilter() {
    this.hideFilter = !this.hideFilter;
  }

  getNameAndId(url): Observable<ApiResponse<INameAndId>> {
    return this.resource.getlist(url);
  }

  formatQueryString(): string {
    let query = '';
    if (this.filter) {
      for (const key of Object.keys(this.filter)) {
        const value = this.filter[key];
        if (value){ query += `&${key}=${value}`; }
      }
    }
    return query;
  }

  getCheckedItems() {
    let checked = 0;
    this.selectedIds = [];
    if (!this.checkItems) { return; }
    for (const checkItem of this.checkItems) {
        if (!checkItem.selected) { continue; }
        checked++;
        this.selectedIds.push(checkItem.id);
      }
    return checked;
  }

  checkAll() {
    this.checkItems.forEach((item) => (item.selected = !this.selectedAll));
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (const checkItem of this.checkItems){
      if (checkItem.selected) { this.checkedList.push(checkItem); }
    }
    return this.checkedList;
  }

  checkUncheckAll() {
    for (const checkItem of this.checkItems){
      checkItem.selected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.checkItems.every((item: any) => item.selected === true);
    this.getCheckedItemList();
  }

}
