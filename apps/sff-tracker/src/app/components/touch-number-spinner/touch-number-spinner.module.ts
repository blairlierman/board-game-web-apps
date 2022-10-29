import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TouchNumberSpinnerComponent } from './touch-number-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  declarations: [TouchNumberSpinnerComponent],
  exports: [TouchNumberSpinnerComponent],
})
export class TouchNumberSpinnerComponentModule {}
