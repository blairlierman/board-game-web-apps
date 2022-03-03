import { createAction, props } from '@ngrx/store';
import { Game } from "../models/game.model";

export const createGame = createAction(
  '[Game] Create Game'
);

export const resumeGame = createAction(
  '[Game Host] Resume Game',
  props<{ gameId: string }>()
);

export const joinGame = createAction(
  '[Game Host/Player] Join Game',
  props<{ game: Game, gameCode: number }>()
);
