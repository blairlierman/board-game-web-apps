import { Player } from "./player.model";

export interface Game {
  id: number,
  startedDate: Date,
  players: Player[]
}
