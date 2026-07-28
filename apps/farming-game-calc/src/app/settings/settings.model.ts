export const PLAYER_CHARACTERS = [
  'Satus Sam',
  'Sunnyside Sidney',
  'Toppenish Tom',
  'Harrah Harry',
  'Roza Ray',
  'Wapato Willie',
] as const;

export type PlayerCharacter = (typeof PLAYER_CHARACTERS)[number];

export interface AppSettings {
  hayPricePerAcre: number;
  grainPricePerAcre: number;
  fruitPricePerAcre: number;
  cowPrice: number;
  tractorPrice: number;
  harvesterPrice: number;
  playerCount: number;
  playerCharacters: string[];
}

export const DEFAULT_APP_SETTINGS: AppSettings = {
  hayPricePerAcre: 2000,
  grainPricePerAcre: 2000,
  fruitPricePerAcre: 5000,
  cowPrice: 500,
  tractorPrice: 10000,
  harvesterPrice: 10000,
  playerCount: 1,
  playerCharacters: [''],
};

export type AppSettingPriceKey =
  | 'hayPricePerAcre'
  | 'grainPricePerAcre'
  | 'fruitPricePerAcre'
  | 'cowPrice'
  | 'tractorPrice'
  | 'harvesterPrice';
