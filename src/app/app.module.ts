import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { environment } from '../environments/environment';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './features/header/components/header.component';
import { LoanCalculatorModule } from './features/loan-calculator/loan-calculator.module';
import { LoanDecoratorService } from './stores/loan-decorator/loan-decorator.service';
import { LoanDecoratorState } from './stores/loan-decorator/loan-decorator.state';

@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [
    AppRouterModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([LoanDecoratorState], {
      developmentMode: !environment.IS_PRODUCTION,
    }),
    RouterModule,
    LoanCalculatorModule,
    MatToolbarModule,
  ],
  providers: [LoanDecoratorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
