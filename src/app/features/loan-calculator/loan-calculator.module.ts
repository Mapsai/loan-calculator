import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoanCalculatorComponent } from './components/loan-calculator.component';
import { LoanCalculatorRouterModule } from './loan-calculator-router.module';

@NgModule({
  declarations: [LoanCalculatorComponent],
  imports: [
    CommonModule,
    LoanCalculatorRouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class LoanCalculatorModule {}
