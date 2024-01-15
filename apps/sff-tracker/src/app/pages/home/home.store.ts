import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Player } from '../../models/player.model';

export interface PlayerState {
  players: Player[];
}

const defaultState: PlayerState = {
  players: [
    { playerId: 1, health: 50 },
    { playerId: 2, health: 50 },
  ],
};

@Injectable()
export class PlayerStore extends ComponentStore<PlayerState> {
  constructor() {
    super(defaultState);
  }

  readonly players$ = this.select(({ players }) => {
    console.log('players', players);
    return players;
  });

  readonly addArmor = this.updater((state, playerId: number) => {
    return {
      players: state.players.map((p) =>
        p.playerId === playerId ? { ...p, armor: p.armor ? p.armor + 1 : 1 } : p
      ),
    };
  });

  readonly updatePlayer = this.updater((state, player: Player) => ({
    players: state.players.map((p) => {
      if (p.playerId === player.playerId) {
        if (player.health < p.health) {
          const healthReductionAmount = p.health - player.health;
          if (p.armor) {
            // healthReductionAmount = healthReductionAmount - p.armor;
            if (healthReductionAmount - p.armor >= 0) {
              player.armor = undefined;
              player.health = p.health - (healthReductionAmount - p.armor);
            } else {
              // healthReductionAmount = Math.abs(healthReductionAmount);
              player.armor = p.armor - healthReductionAmount;
              player.health = p.health;
            }
          }
        }
        return player; //{ ...p, health: player.health, armor: player.armor };
      }

      return p;
    }),
  }));

  selectPlayer(playerId: number) {
    return this.select((state) =>
      state.players.find((p) => p.playerId === playerId)
    );
  }
}
