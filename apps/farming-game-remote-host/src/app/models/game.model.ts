import { Player } from "./player.model";

export interface Game {
  id: number,
  code: number,
  startedDate: Date,
  players: Player[]
}
