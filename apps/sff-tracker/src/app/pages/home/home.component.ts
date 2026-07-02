import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PlayerStore } from './home.store';

@Component({
    selector: 'farming-game-remote-host-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [PlayerStore],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent {
  //#region Constants
  readonly PLAYER_ONE = 1;
  readonly PLAYER_TWO = 2;
  //#endregion
  readonly players$ = this.playerStore.players$;

  constructor(private readonly playerStore: PlayerStore) {}

  updatePlayerHealth(playerId: number, health: number) {
    this.playerStore.updatePlayer({ playerId, health });
  }
}
