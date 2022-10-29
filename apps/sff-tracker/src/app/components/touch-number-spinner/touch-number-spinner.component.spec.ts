import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchNumberSpinnerComponent } from './touch-number-spinner.component';

describe('TouchNumberSpinnerComponent', () => {
  let component: TouchNumberSpinnerComponent;
  let fixture: ComponentFixture<TouchNumberSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TouchNumberSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TouchNumberSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
