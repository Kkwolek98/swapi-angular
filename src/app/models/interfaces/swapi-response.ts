import { Person } from "./person";
import { Starship } from "./starship";

export interface SwapiResponse<T extends Person | Starship> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
