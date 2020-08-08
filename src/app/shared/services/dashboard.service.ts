import { Injectable, Injector } from '@angular/core';
import { IRootService, RootService, routes } from '@app/shared';
import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { IChallenge, IChallengeConfig, IChallengeDetail, IChallengeFormDetail, IJoinChallenge } from '@app/shared/common/model/IChallenge';
import { Observable } from 'rxjs/internal/Observable';
import { IDashboard } from '@app/shared/common/model/IDashboard';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandler } from '@app/shared/common/Error/ErrorHandler';

export interface IDashboardService extends IRootService<ApiResponse<IDashboard>>{
  organizer(): Observable<ApiResponse<IDashboard>>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends RootService<ApiResponse<any>> implements IDashboardService{

  constructor(httpClient: HttpClient, inject: Injector) {
    super(httpClient, inject);
  }

  organizer(): Observable<ApiResponse<IDashboard>> {
    return this.getlist(routes.DASHBOARD.ORGANIZER)
        .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
  }
}
