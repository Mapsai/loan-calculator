import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './features/header/components/header.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        // Have nothing generic to display. Redirect to loan module for now
        path: '',
        pathMatch: 'full',
        redirectTo: 'loan',
      },
      {
        path: 'loan',
        loadChildren: () => import('./features/loan-calculator/loan-calculator.module').then((m) => m.LoanCalculatorModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
})
export class AppRouterModule {}
