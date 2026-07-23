import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TouchInputSpinnerComponent } from './touch-input-spinner/touch-input-spinner.component';
import { FormsModule } from '@angular/forms';
import { DollarAmountInputComponent } from './dollar-amount-input/dollar-amount-input.component';
import { TouchCheckboxComponent } from './touch-checkbox/touch-checkbox.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { provideServiceWorker } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    TouchInputSpinnerComponent,
    DollarAmountInputComponent,
    TouchCheckboxComponent,
    AboutPageComponent,
    MainPageComponent,
    SettingsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
