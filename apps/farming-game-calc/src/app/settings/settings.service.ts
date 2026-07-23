import { Injectable } from '@angular/core';
import {
  AppSettingPriceKey,
  AppSettings,
  DEFAULT_APP_SETTINGS,
  PLAYER_CHARACTERS,
} from './settings.model';

export const SETTINGS_STORAGE_KEY = 'farming-game-calc-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private settings: AppSettings;

  constructor() {
    this.settings = this.loadSettings();
  }

  getSettings(): AppSettings {
    return {
      ...this.settings,
      playerCharacters: [...this.settings.playerCharacters],
    };
  }

  setPrice(key: AppSettingPriceKey, value: number | string): void {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return;
    }

    this.settings = {
      ...this.settings,
      [key]: parsed,
    };
    this.persist();
  }

  setPlayerCount(count: number | string): void {
    const parsed = Math.floor(Number(count));
    if (!Number.isFinite(parsed) || parsed < 1) {
      return;
    }

    this.settings = this.normalize({
      ...this.settings,
      playerCount: parsed,
    });
    this.persist();
  }

  setPlayerCharacter(index: number, character: string): void {
    if (index < 0 || index >= this.settings.playerCount) {
      return;
    }

    const safeCharacter = PLAYER_CHARACTERS.includes(character as never)
      ? character
      : '';

    const playerCharacters = [...this.settings.playerCharacters];
    playerCharacters[index] = safeCharacter;

    this.settings = this.normalize({
      ...this.settings,
      playerCharacters,
    });
    this.persist();
  }

  resetToDefaults(): void {
    this.settings = {
      ...DEFAULT_APP_SETTINGS,
      playerCharacters: [...DEFAULT_APP_SETTINGS.playerCharacters],
    };
    this.persist();
  }

  private loadSettings(): AppSettings {
    try {
      const raw = sessionStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) {
        return {
          ...DEFAULT_APP_SETTINGS,
          playerCharacters: [...DEFAULT_APP_SETTINGS.playerCharacters],
        };
      }

      const parsed = JSON.parse(raw);
      return this.normalize(parsed);
    } catch {
      return {
        ...DEFAULT_APP_SETTINGS,
        playerCharacters: [...DEFAULT_APP_SETTINGS.playerCharacters],
      };
    }
  }

  private normalize(input: Partial<AppSettings>): AppSettings {
    const settings: AppSettings = {
      ...DEFAULT_APP_SETTINGS,
      ...input,
    };

    settings.hayPricePerAcre = this.normalizeNonNegativeNumber(
      settings.hayPricePerAcre,
      DEFAULT_APP_SETTINGS.hayPricePerAcre,
    );
    settings.grainPricePerAcre = this.normalizeNonNegativeNumber(
      settings.grainPricePerAcre,
      DEFAULT_APP_SETTINGS.grainPricePerAcre,
    );
    settings.fruitPricePerAcre = this.normalizeNonNegativeNumber(
      settings.fruitPricePerAcre,
      DEFAULT_APP_SETTINGS.fruitPricePerAcre,
    );
    settings.cowPrice = this.normalizeNonNegativeNumber(
      settings.cowPrice,
      DEFAULT_APP_SETTINGS.cowPrice,
    );
    settings.tractorPrice = this.normalizeNonNegativeNumber(
      settings.tractorPrice,
      DEFAULT_APP_SETTINGS.tractorPrice,
    );
    settings.harvesterPrice = this.normalizeNonNegativeNumber(
      settings.harvesterPrice,
      DEFAULT_APP_SETTINGS.harvesterPrice,
    );

    const normalizedPlayerCount = Math.floor(Number(settings.playerCount));
    settings.playerCount =
      Number.isFinite(normalizedPlayerCount) && normalizedPlayerCount > 0
        ? normalizedPlayerCount
        : DEFAULT_APP_SETTINGS.playerCount;

    const incomingCharacters = Array.isArray(settings.playerCharacters)
      ? settings.playerCharacters
      : [];

    const normalizedCharacters = incomingCharacters.map((character) =>
      PLAYER_CHARACTERS.includes(character as never) ? character : '',
    );

    while (normalizedCharacters.length < settings.playerCount) {
      normalizedCharacters.push('');
    }

    settings.playerCharacters = normalizedCharacters.slice(
      0,
      settings.playerCount,
    );

    return settings;
  }

  private normalizeNonNegativeNumber(
    value: number,
    defaultValue: number,
  ): number {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
      return defaultValue;
    }

    return parsed;
  }

  private persist(): void {
    sessionStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
  }
}
