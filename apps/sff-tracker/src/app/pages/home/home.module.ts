import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TouchNumberSpinnerComponentModule } from '../../components/touch-number-spinner/touch-number-spinner.module';

@NgModule({
  imports: [CommonModule, TouchNumberSpinnerComponentModule ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
