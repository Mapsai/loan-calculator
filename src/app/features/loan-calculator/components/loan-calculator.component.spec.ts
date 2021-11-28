import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { LoanCalculatorServiceMock } from '../../../../mocks/loan-calculator.service.mock';
import { CheckLoanAction } from '../../../stores/loan-decorator/loan-decorator.actions';
import { LoanDecoratorService } from '../../../stores/loan-decorator/loan-decorator.service';
import { LoanDecoratorState } from '../../../stores/loan-decorator/loan-decorator.state';
import { LoanCalculatorComponent } from './loan-calculator.component';

describe('Loan Calculator Component', () => {
  let component: LoanCalculatorComponent;
  let fixture: ComponentFixture<LoanCalculatorComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoanCalculatorComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([LoanDecoratorState])],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: LoanDecoratorService,
          useValue: LoanCalculatorServiceMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCalculatorComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should successfully create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly create form group on init', () => {
    component.ngOnInit();

    expect(component.formGroup.value).toEqual({
      monthlyIncome: 500000,
      requestedAmount: 20000000,
      loanTerm: 36,
      children: 'NONE',
      coapplicant: 'NONE',
    });
  });

  it('should correctly get power for decimals', () => {
    expect(component.decimalPower).toEqual(1000);
  });

  it('should dispatch action when form is valid', () => {
    const payload = {
      monthlyIncome: 500000,
      requestedAmount: 20000000,
      loanTerm: 36,
      children: 'NONE',
      coapplicant: 'NONE',
    };

    component.formGroup.patchValue(payload);

    component.onSubmit();
    expect(store.dispatch).toHaveBeenCalledWith(new CheckLoanAction(payload));
  });

  it('should not dispatch action when form is invalid', () => {
    const payload = {
      monthlyIncome: 1,
      requestedAmount: 1,
      loanTerm: 1,
      children: 'NONE',
      coapplicant: 'NONE',
    };

    component.formGroup.patchValue(payload);

    component.onSubmit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
