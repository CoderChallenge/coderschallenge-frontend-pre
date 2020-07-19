import { Injectable, Injector } from '@angular/core';
import { IRootService, RootService, routes } from '@app/shared';
import { ApiResponse } from '@app/shared/common/interface/IRootObject';
import { Observable } from 'rxjs/internal/Observable';
import { ITask } from '@app/shared/common/model/ITask';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandler } from '@app/shared/common/Error/ErrorHandler';

export interface ITaskService extends IRootService<ApiResponse<ITask>>{
  createTask(body: ITask): Observable<ApiResponse<string>>;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService extends RootService<ApiResponse<any>> implements ITaskService{
  constructor(httpClient: HttpClient, inject: Injector) {
    super(httpClient, inject);
  }


  createTask(body: ITask): Observable<ApiResponse<string>> {
    return this.post(routes.TASK.CREATE, body)
        .pipe(map(res => res as ApiResponse<string>), catchError(ErrorHandler.ErrorServerConnection));
  }

}
