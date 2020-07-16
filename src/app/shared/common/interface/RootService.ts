import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { IRootObject } from './IRootObject';
import { IRootService } from './IRootService';
import { IQueryOptions } from './IQueryOptions';
import { ICountModel } from './ICountModel';
import { QueryBuilder } from './QueryBuilder';


export class RootService<T extends IRootObject> implements IRootService<T> {
  header = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  constructor(public httpClient: HttpClient, private inject?: Injector) { }

  count(queryOptions: IQueryOptions, url: string): Observable<ICountModel<T>> {
    return this.httpClient
      .get<ICountModel<T>>(`${url}/${QueryBuilder.toQueryString(queryOptions)}`)
      .pipe(
        map(data => {
          return data as ICountModel<T>;
        })
      );
  }

  query(queryOptions: IQueryOptions, url: string): Observable<ICountModel<T>> {
    return this.httpClient
      .get<ICountModel<T>>(`${url}/${QueryBuilder.toQueryString(queryOptions)}`)
      .pipe(
        map(data => {
          return data as ICountModel<T>;
        })
      );
  }

  create(item: T, url: string): Observable<T> {
    return this.httpClient.post<T>(`${url}`, JSON.stringify(item));
  }

  post(url: string, body: any, headers?: any): Observable<T> {
    const reqHeader = new HttpHeaders(
      headers || this.header
    );
    return this.httpClient.post<T>(`${url}`, body, { headers: reqHeader });
  }

  update(item: T, url: string): Observable<T> {
    const reqHeader = new HttpHeaders(this.header);
    return this.httpClient.put<T>(`${url}`, item, { headers: reqHeader }).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  delete(item: any, url: string) {
    return this.httpClient.delete(`${url}/${item.id}`);
  }

  get(id: any, url: string): Observable<T> {
    return this.httpClient.get(`${url}/${id}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  getlist(url: string, param?: any): Observable<T> {
    return this.httpClient.get(`${url}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  getquery(url: string, queryKey: string, param?: any): Observable<any> {
    const paramval = new HttpParams().set(queryKey, param);
    return this.httpClient.get(`${url}`, { params: paramval }).pipe(
      map(data => {
        return data;
      })
    );
  }

  details(id: number, url: string) {
    return this.httpClient.get(`${url}/${id}`).pipe(
      map(data => {
        return data as T;
      })
    );
  }

  private get alert(): ToastrService {
    return this.inject.get(ToastrService);
  }

  successAlert(msg: any, title?: any) {
    this.alert.success(msg, title, { timeOut: 5000, progressBar: true });
  }
  errorAlert(msg: any, title?: any) {
    this.alert.error(msg || 'Please check your internet connection', title, { timeOut: 5000, progressBar: true });
  }
  warningAlert(msg: any, title?: any) {
    this.alert.warning(msg, title, { timeOut: 5000, progressBar: true });
  }
  InfoAlert(msg: any, title?: any) {
    this.alert.info(msg, title, { timeOut: 5000, progressBar: true });
  }
}
