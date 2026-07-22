import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dollar-amount-input',
  standalone: false,
  templateUrl: './dollar-amount-input.component.html',
  styleUrls: ['./dollar-amount-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DollarAmountInputComponent),
      multi: true,
    },
  ],
})
export class DollarAmountInputComponent implements ControlValueAccessor {
  @Input() showNegative = false;
  @Input() inputValue = 0;
  @Input() class = '';

  propagateChange = (_: any) => {};

  onInputChanged(newValue: number) {
    this.inputValue = newValue;
    this.propagateChange(this.inputValue);
  }

  writeValue(value: number) {
    if (value !== undefined) {
      this.inputValue = value;
    }
  }

  registerOnChange(fn: (_: number) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
