import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoanCalculatorComponent } from './components/loan-calculator.component';

const FeatureRoutes: Routes = [
  {
    path: '',
    component: LoanCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(FeatureRoutes)],
})
export class LoanCalculatorRouterModule {}
