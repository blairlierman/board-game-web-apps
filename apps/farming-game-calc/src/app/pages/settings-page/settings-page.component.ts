import { Component } from '@angular/core';
import {
  faChevronLeft,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  AppSettingPriceKey,
  AppSettings,
  PLAYER_CHARACTERS,
} from '../../settings/settings.model';
import { SettingsService } from '../../settings/settings.service';

interface PriceField {
  key: AppSettingPriceKey;
  label: string;
}

@Component({
  selector: 'app-settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent {
  faBackIcon: IconDefinition = faChevronLeft;
  characters = [...PLAYER_CHARACTERS];
  settings: AppSettings;

  priceFields: PriceField[] = [
    { key: 'hayPricePerAcre', label: 'Hay Price Per Acre' },
    { key: 'grainPricePerAcre', label: 'Grain Price Per Acre' },
    { key: 'fruitPricePerAcre', label: 'Fruit Price Per Acre' },
    { key: 'cowPrice', label: 'Cow Price' },
    { key: 'tractorPrice', label: 'Tractor Price' },
    { key: 'harvesterPrice', label: 'Harvester Price' },
  ];

  constructor(private readonly settingsService: SettingsService) {
    this.settings = this.settingsService.getSettings();
  }

  get playerSlots(): number[] {
    return Array.from(
      { length: this.settings.playerCount },
      (_, index) => index,
    );
  }

  onPriceChanged(key: AppSettingPriceKey, value: string | number): void {
    this.settingsService.setPrice(key, value);
    this.refreshSettings();
  }

  onPlayerCountChanged(value: string | number): void {
    this.settingsService.setPlayerCount(value);
    this.refreshSettings();
  }

  onPlayerCharacterChanged(index: number, character: string): void {
    this.settingsService.setPlayerCharacter(index, character);
    this.refreshSettings();
  }

  private refreshSettings(): void {
    this.settings = this.settingsService.getSettings();
  }
}
