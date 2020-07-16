import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { ErrorHandler } from '@app/shared/common/Error/ErrorHandler';
import { IRootService, RootService } from '@app/shared';

export interface IFileService extends IRootService<any> {
  uploadFileToCloud(data: FormData, url: any): Observable<HttpEvent<ApiResponse<any>>>;
}

@Injectable({
  providedIn: 'root'
})
export class FileService extends RootService<any> implements IFileService{

  constructor(httpClient: HttpClient, injector: Injector) {
    super(httpClient, injector);
  }

  uploadFileToCloud(data: FormData, url: any): Observable<HttpEvent<ApiResponse<any>>> {
    return this.httpClient.post<any>(`${url}`, data, {
      reportProgress: true, observe: 'events'
    }).pipe(map(res => res as HttpEvent<ApiResponse<any>>), catchError(ErrorHandler.ErrorServerConnection));
  }
}
