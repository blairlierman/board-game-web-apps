import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';
import { Player } from '../../models/player.model';

export interface PlayerState {
  players: Player[];
}

const defaultState: PlayerState = {
  players: [{health: 50}, {health: 50}],
};

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  constructor() {
    super(defaultState);
  }

  readonly players$ = this.select(({ players }) => players);
}