import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TouchNumberSpinnerComponentModule } from '../../components/touch-number-spinner/touch-number-spinner.module';
import { MatCardModule } from "@angular/material/card"
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, TouchNumberSpinnerComponentModule, MatCardModule, FormsModule ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeComponentModule {}
