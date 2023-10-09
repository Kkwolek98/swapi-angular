import { Person } from "./person";
import { Starship } from "./starship";

export interface StoreModel<T extends Person | Starship> {
  allResults: T[];
  currentPage: T[];
  count: number;
  next: string | null;
  previous: string | null;
}