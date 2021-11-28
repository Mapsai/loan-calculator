import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';

import { FailureResponse, SuccessResponse } from '../../models/loan-calculator/loan-calculator.interfaces';
import { DefaultErrorMessage } from '../../models/loan-calculator/response.labels';
import { CheckLoanAction } from './loan-decorator.actions';
import { LoanDecoratorService } from './loan-decorator.service';

export interface ILoanDecoratorState {
  isLoading: boolean;
  response: FailureResponse | SuccessResponse | null;
  error: string | null;
}

@State<ILoanDecoratorState>({
  name: 'loanDecorator',
  defaults: {
    isLoading: false,
    response: null,
    error: null,
  },
})
@Injectable()
export class LoanDecoratorState {
  constructor(private loanDecoratorService: LoanDecoratorService) {}

  @Selector()
  public static isLoading(state: ILoanDecoratorState): boolean {
    return state.isLoading;
  }

  @Selector()
  public static response(state: ILoanDecoratorState): FailureResponse | SuccessResponse | null {
    return state.response;
  }

  @Selector()
  public static error(state: ILoanDecoratorState): string | null {
    return state.error;
  }

  @Action(CheckLoanAction)
  private checkLoan(ctx: StateContext<ILoanDecoratorState>, action: CheckLoanAction) {
    ctx.patchState({ isLoading: true, response: null, error: null });

    return this.loanDecoratorService.checkLoan(action.payload).pipe(
      tap((results) => {
        ctx.patchState({ isLoading: false, response: results, error: null });
      }),
      catchError((response: HttpErrorResponse) => {
        const responseError = response.error;
        let error = DefaultErrorMessage;

        if (responseError.general?.message) {
          error = responseError.general.message;
        }

        if (responseError.fields?.length) {
          error = responseError.fields[0].message;
        }

        ctx.patchState({ isLoading: false, response: null, error });

        return of(null);
      })
    );
  }
}
