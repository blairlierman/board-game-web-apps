import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TouchNumberSpinnerComponent } from './touch-number-spinner.component';

describe('TouchNumberSpinnerComponent', () => {
  let component: TouchNumberSpinnerComponent;
  let fixture: ComponentFixture<TouchNumberSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouchNumberSpinnerComponent],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TouchNumberSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize spinner form with default value 50', () => {
    expect(component.spinnerValueControl?.value).toBe(50);
  });

  it('should emit valueChanged when form value changes', (done) => {
    component.valueChanged.subscribe((value) => {
      expect(value).toBe(75);
      done();
    });

    component.touchSpinnerForm.patchValue({ spinnerValue: 75 });
  });

  it('should emit null when the spinner control is missing', () => {
    component.touchSpinnerForm = new FormGroup({});
    const emitSpy = jest.spyOn(component.valueChanged, 'emit');

    component.changeSpinnerValue(5);

    expect(emitSpy).toHaveBeenCalledWith(null);
  });

  it('should update spinner value and emit the new value when changeSpinnerValue is called', () => {
    const emitSpy = jest.spyOn(component.valueChanged, 'emit');

    component.changeSpinnerValue(10);

    expect(component.spinnerValueControl?.value).toBe(60);
    expect(emitSpy).toHaveBeenCalledWith(60);
  });
});
