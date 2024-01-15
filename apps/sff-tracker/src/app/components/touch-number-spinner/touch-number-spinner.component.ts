import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sff-touch-number-spinner',
  templateUrl: './touch-number-spinner.component.html',
  styleUrls: ['./touch-number-spinner.component.scss'],
})
export class TouchNumberSpinnerComponent implements OnInit, OnDestroy {
  //#region Component Inputs
  @Input() flipped = false;
  //#endregion

  //#region Component Outputs
  @Output() valueChanged = new EventEmitter();
  //#endregion

  //#region Class Observables
  private readonly ngUnsubscribe$: Subject<void> = new Subject<void>();
  //#endregion

  //#region Reactive Forms Setup
  readonly formBuilder: FormBuilder = new FormBuilder();
  touchSpinnerForm!: FormGroup;
  //#endregion

  //#region Getters
  get spinnerValueControl() {
    return this.touchSpinnerForm.get('spinnerValue');
  }
  //#endregion

  ngOnInit(): void {
    this.touchSpinnerForm = new FormGroup({
      spinnerValue: new FormControl<number>(50),
    });

    this.spinnerValueControl?.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value) => {
        this.valueChanged.emit(value);
      });
  }

  changeSpinnerValue(step: number) {
    const touchSpinnerValue = this.spinnerValueControl
      ? this.spinnerValueControl.value + step
      : null;
    this.touchSpinnerForm.patchValue({ spinnerValue: touchSpinnerValue });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.unsubscribe();
  }
}
