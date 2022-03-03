import { Farmer } from "./farmer.model";

export interface Player {
  id: number,
  cash: number,
  debt: number,
  farmer: Farmer
}
