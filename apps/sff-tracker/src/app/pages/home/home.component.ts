import { Component, OnInit } from '@angular/core';
import { PlayerStore } from './home.store';

@Component({
  selector: 'farming-game-remote-host-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ PlayerStore ]
})
export class HomeComponent {
  players$;

  constructor(private readonly playerStore: PlayerStore) {
    this.players$ = playerStore.players$;
  }

  updatePlayerHealth(playerId: number, health: number) {
    this.playerStore.updatePlayer({playerId, health});
  }
}
