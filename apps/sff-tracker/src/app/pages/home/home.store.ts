import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { withLatestFrom, tap } from 'rxjs/operators';
import { Player } from '../../models/player.model';

export interface PlayerState {
  players: Player[];
}

const defaultState: PlayerState = {
  players: [{playerId: 1, health: 50}, {playerId: 2, health: 50}],
};

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  constructor() {
    super(defaultState);
  }

  readonly players$ = this.select(({ players }) => players);

  readonly updatePlayer = this.updater((state, player: Player) => ({
    players : state.players.map(p =>p.playerId === player.playerId
        ? { ...p, health: player.health }
        : p
        )
  }));

  selectPlayer(playerId: number) {
    return this.select((state) => state.players.find(p => p.playerId === playerId));
  }
}