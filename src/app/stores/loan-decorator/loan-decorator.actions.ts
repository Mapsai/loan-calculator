import { LoanCalculatorRequest } from '../../models/loan-calculator/loan-calculator.interfaces';

export class CheckLoanAction {
  public static readonly type = '[Loan] Check Loan';

  constructor(public payload: LoanCalculatorRequest) {}
}
