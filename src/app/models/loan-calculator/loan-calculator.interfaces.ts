export interface LoanCalculatorRequest {
  monthlyIncome: number;
  requestedAmount: number;
  loanTerm: number;
  children: string;
  coapplicant: string;
}

export interface FailureResponse {
  general: General;
  fields: Field[];
}

export interface SuccessResponse {
  loanAmount: number;
  interestRate: number;
}

interface General {
  code: string;
  message: string;
}

interface Field {
  params: string;
  message: string;
}
