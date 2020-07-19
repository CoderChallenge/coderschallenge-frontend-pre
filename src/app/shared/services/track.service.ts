import { Injectable, Injector } from '@angular/core';
import { IRootService, RootService, routes } from '@app/shared';
import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { ITrack } from '@app/shared/common/model/ITrack';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandler } from '@app/shared/common/Error/ErrorHandler';

export interface ITrackService extends IRootService<ApiResponse<ITrack>>{
  getTracks(): Observable<ApiResponse<ITrack>>;
  createTrack(body: ITrack): Observable<ApiResponse<string>>;
  EditTrack(body: ITrack): Observable<ApiResponse<string>>;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService extends RootService<ApiResponse<any>> implements ITrackService{

  constructor(httpClient: HttpClient, inject: Injector) {
    super(httpClient, inject);
  }

  getTracks(): Observable<ApiResponse<ITrack>> {
    return this.getlist(routes.TRACK.LIST)
      .pipe(map(res => res as ApiResponse<ITrack>),
        catchError(ErrorHandler.ErrorServerConnection));
  }

  createTrack(body: ITrack): Observable<ApiResponse<string>> {
    return this.post(`${routes.TRACK.CREATE}`, body)
        .pipe(map(res => res),
            catchError(ErrorHandler.ErrorServerConnection));
  }

  EditTrack(body: ITrack): Observable<ApiResponse<string>> {
    return this.update(body, `${routes.TRACK.UPDATE}`)
        .pipe(map(res => res),
            catchError(ErrorHandler.ErrorServerConnection));
  }
}
