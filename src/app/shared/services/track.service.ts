import { Injectable } from '@angular/core';
import {IRootService, RootService, routes} from "@app/shared";
import {ApiResponse} from "@app/shared/common/interface/IRootObject";
import {ITrack} from "@app/shared/common/model/ITrack";
import {Observable} from "rxjs/internal/observable";
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {ErrorHandler} from "@app/shared/common/Error/ErrorHandler";

export interface ITrackService extends IRootService<ApiResponse<ITrack>>{
  getTracks():Observable<ApiResponse<ITrack>>;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService extends RootService<ApiResponse<any>> implements ITrackService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getTracks(): Observable<ApiResponse<ITrack>> {
    return this.getlist(routes.TRACK.LIST)
      .pipe(map(res => res as ApiResponse<ITrack>),
        catchError(ErrorHandler.ErrorServerConnection))
  }
}
