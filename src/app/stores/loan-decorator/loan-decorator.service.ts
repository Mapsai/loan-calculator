import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { FailureResponse, LoanCalculatorRequest, SuccessResponse } from '../../models/loan-calculator/loan-calculator.interfaces';

@Injectable()
export class LoanDecoratorService {
  private readonly routeURL = environment.API;

  constructor(private readonly http: HttpClient) {}

  public checkLoan(payload: LoanCalculatorRequest): Observable<FailureResponse | SuccessResponse> {
    return this.http.post<FailureResponse | SuccessResponse>(this.routeURL, payload, {
      headers: { 'X-API-KEY': environment.API_KEY },
    });
  }
}
