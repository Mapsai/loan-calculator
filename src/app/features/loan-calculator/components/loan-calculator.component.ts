import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SuccessResponse } from '../../../models/loan-calculator/loan-calculator.interfaces';
import { CheckLoanAction } from '../../../stores/loan-decorator/loan-decorator.actions';
import { LoanDecoratorState } from '../../../stores/loan-decorator/loan-decorator.state';
import {
  Children,
  CoApplicant,
  DecimalLength,
  MaximumLoanTerm,
  MinimumLoanTerm,
  MinimumMonthlyIncome,
  MinimumRequestedAmount,
} from '../models/form-options.constants';
import { Labels } from '../models/loan-calculator.labels';
import { isRequiredValidNumber } from '../utilities/is-required-valid-number.validator';
import { isValidEnum } from '../utilities/is-valid-enum.validator';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanCalculatorComponent implements OnInit {
  @Select(LoanDecoratorState.isLoading)
  public readonly isLoading$!: Observable<boolean>;

  @Select(LoanDecoratorState.response)
  public readonly response$!: Observable<SuccessResponse | null>;

  @Select(LoanDecoratorState.error) public readonly error$!: Observable<string | null>;

  public formGroup: FormGroup = new FormGroup({});
  public readonly childrenOptions = Children;
  public readonly coApplicantOptions = CoApplicant;
  public readonly labels = Labels;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        monthlyIncome: new FormControl(MinimumMonthlyIncome, [isRequiredValidNumber(MinimumMonthlyIncome)]),
        requestedAmount: new FormControl(MinimumRequestedAmount, [isRequiredValidNumber(MinimumRequestedAmount)]),
        loanTerm: new FormControl(MinimumLoanTerm, [isRequiredValidNumber(MinimumLoanTerm, MaximumLoanTerm)]),
        children: new FormControl(Object.keys(Children)[0], [isValidEnum(Children)]),
        coapplicant: new FormControl(Object.keys(CoApplicant)[0], [isValidEnum(CoApplicant)]),
      },
      { updateOn: 'blur' }
    );
  }

  public get decimalPower(): number {
    return 10 ** DecimalLength;
  }

  public onSubmit(): void {
    console.log(this.formGroup.valid);
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.store.dispatch(new CheckLoanAction(this.formGroup.value));
    }
  }
}
