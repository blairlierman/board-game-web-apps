import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { TouchInputSpinnerComponent } from '../../touch-input-spinner/touch-input-spinner.component';
import {
  SETTINGS_STORAGE_KEY,
  SettingsService,
} from '../../settings/settings.service';
import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(waitForAsync(() => {
    sessionStorage.removeItem(SETTINGS_STORAGE_KEY);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule],
      declarations: [SettingsPageComponent, TouchInputSpinnerComponent],
      providers: [SettingsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default settings values', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const hayInput = compiled.querySelector(
      '#hayPricePerAcre',
    ) as HTMLInputElement;

    expect(hayInput.value).toBe('2000');
    expect(component.settings.playerCount).toBe(1);
    expect(component.playerSlots.length).toBe(1);
  });

  it('should update player slots after changing player count', () => {
    component.onPlayerCountChanged(3);

    expect(component.settings.playerCount).toBe(3);
    expect(component.playerSlots.length).toBe(3);
    expect(component.settings.playerCharacters.length).toBe(3);
  });

  it('should persist selected characters', () => {
    component.onPlayerCountChanged(2);
    component.onPlayerCharacterChanged(0, 'Toppenish Tom');

    const settings = TestBed.inject(SettingsService).getSettings();
    expect(settings.playerCharacters[0]).toBe('Toppenish Tom');
  });
});
