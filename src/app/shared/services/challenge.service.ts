import { Injectable, Injector } from '@angular/core';
import { IRootService, IUser, RootService, routes } from '@app/shared';
import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { Observable } from 'rxjs/internal/Observable';
import { IChallenge, IChallengeConfig, IChallengeFormDetail, IChallengeList } from '@app/shared/common/model/IChallenge';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandler } from '@app/shared/common/Error/ErrorHandler';

export interface IChallengeService extends IRootService<ApiResponse<IChallenge>>{
  createChallenge(body: IChallenge): Observable<ApiResponse<IChallenge>>;
  attachLevelAndTrack(body: IChallengeConfig): Observable<ApiResponse<string>>;
  getChallengeFormDetail(challengeId: string): Observable<ApiResponse<IChallengeFormDetail>>;
}

@Injectable({
  providedIn: 'root'
})
export class ChallengeService extends RootService<ApiResponse<any>> implements IChallengeService{
  constructor(httpClient: HttpClient, inject: Injector) {
    super(httpClient, inject);
  }

  attachLevelAndTrack(body: IChallengeConfig): Observable<ApiResponse<string>> {
    return this.post(routes.CHALLENGE.CONFIG, body)
      .pipe(map(res => res as ApiResponse<string>), catchError(ErrorHandler.ErrorServerConnection));
    }

  createChallenge(body: IChallenge): Observable<ApiResponse<IChallenge>> {
    return this.post(routes.CHALLENGE.CREATE, body)
      .pipe(map(res => res), catchError(ErrorHandler.ErrorServerConnection));
  }

  getChallengeFormDetail(challengeId: string): Observable<ApiResponse<IChallengeFormDetail>> {
     return this.get(challengeId, routes.CHALLENGE.FORMDETAIL)
         .pipe(map(res => res as ApiResponse<IChallengeFormDetail>), catchError(ErrorHandler.ErrorServerConnection));
  }

}
