import { computed, Injectable, Signal, signal } from '@angular/core';
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
export class PlayerStore {
  private readonly state = signal<PlayerState>(defaultState);

  readonly players = computed(() => this.state().players);

  updatePlayer(player: Player): void {
    this.state.update((state) => ({
      players: state.players.map((currentPlayer) =>
        currentPlayer.playerId === player.playerId
          ? { ...currentPlayer, health: player.health }
          : currentPlayer
      ),
    }));
  }

  selectPlayer(playerId: number): Signal<Player | undefined> {
    return computed(() =>
      this.players().find((player) => player.playerId === playerId)
    );
  }
}
