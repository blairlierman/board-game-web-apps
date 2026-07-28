import { SettingsService, SETTINGS_STORAGE_KEY } from './settings.service';
import { DEFAULT_APP_SETTINGS } from './settings.model';

describe('SettingsService', () => {
  beforeEach(() => {
    sessionStorage.removeItem(SETTINGS_STORAGE_KEY);
  });

  it('should load default settings when storage is empty', () => {
    const service = new SettingsService();

    expect(service.getSettings()).toEqual(DEFAULT_APP_SETTINGS);
  });

  it('should persist updated prices and player values', () => {
    const service = new SettingsService();

    service.setPrice('hayPricePerAcre', 2500);
    service.setPlayerCount(3);
    service.setPlayerCharacter(0, 'Satus Sam');
    service.setPlayerCharacter(1, 'Harrah Harry');

    const reloaded = new SettingsService();
    const settings = reloaded.getSettings();

    expect(settings.hayPricePerAcre).toBe(2500);
    expect(settings.playerCount).toBe(3);
    expect(settings.playerCharacters[0]).toBe('Satus Sam');
    expect(settings.playerCharacters[1]).toBe('Harrah Harry');
    expect(settings.playerCharacters[2]).toBe('');
  });

  it('should normalize malformed or invalid stored payloads', () => {
    sessionStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        hayPricePerAcre: -1,
        grainPricePerAcre: 'bad',
        playerCount: 0,
        playerCharacters: ['Invalid Character'],
      }),
    );

    const service = new SettingsService();
    const settings = service.getSettings();

    expect(settings.hayPricePerAcre).toBe(DEFAULT_APP_SETTINGS.hayPricePerAcre);
    expect(settings.grainPricePerAcre).toBe(
      DEFAULT_APP_SETTINGS.grainPricePerAcre,
    );
    expect(settings.playerCount).toBe(DEFAULT_APP_SETTINGS.playerCount);
    expect(settings.playerCharacters).toEqual(
      DEFAULT_APP_SETTINGS.playerCharacters,
    );
  });

  it('should ignore invalid updates', () => {
    const service = new SettingsService();

    service.setPrice('cowPrice', -10);
    service.setPlayerCount(0);
    service.setPlayerCharacter(100, 'Satus Sam');

    const settings = service.getSettings();

    expect(settings.cowPrice).toBe(DEFAULT_APP_SETTINGS.cowPrice);
    expect(settings.playerCount).toBe(DEFAULT_APP_SETTINGS.playerCount);
    expect(settings.playerCharacters).toEqual(
      DEFAULT_APP_SETTINGS.playerCharacters,
    );
  });
});
