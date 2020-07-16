import { Injectable } from '@angular/core';
import {IRootService, RootService, routes} from "@app/shared";
import {ApiResponse} from "@app/shared/common/interface/IRootObject";
import {ILevel} from "@app/shared/common/model/ILevel";
import { Observable } from 'rxjs/internal/observable';
import {HttpClient} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {ErrorHandler} from "@app/shared/common/Error/ErrorHandler";

export interface ILevelService extends IRootService<ApiResponse<ILevel>>{
 getLevels():Observable<ApiResponse<ILevel>>
}
@Injectable({
  providedIn: 'root'
})
export class LevelService extends RootService<ApiResponse<any>> implements ILevelService{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getLevels(): Observable<ApiResponse<ILevel>> {
    return this.getlist(routes.LEVEL.LIST)
      .pipe(map(res => res as ApiResponse<ILevel>),
        catchError(ErrorHandler.ErrorServerConnection));
  }

}
