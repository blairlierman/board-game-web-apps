import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sff-touch-number-spinner',
  templateUrl: './touch-number-spinner.component.html',
  styleUrls: ['./touch-number-spinner.component.scss'],
})
export class TouchNumberSpinnerComponent implements OnInit {
  //#region Component Inputs 
  @Input() flipped = false;
  //#endregion
  
  //#region Reactive Forms Setup
  readonly formBuilder: FormBuilder = new FormBuilder();
  touchSpinnerForm!: FormGroup;
  //#endregion

  ngOnInit(): void {
    this.touchSpinnerForm = new FormGroup({
      spinnerValue: new FormControl<number>(50),
    });
  }

  changeSpinnerValue(step: number)
  {
    const touchSpinner = this.touchSpinnerForm.get('spinnerValue');
    this.touchSpinnerForm.patchValue({'spinnerValue': touchSpinner ? touchSpinner.value + step : null})
  }
}
