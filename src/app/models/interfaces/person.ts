export interface Person {
  type: 'person';
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[]; // urls
  species: string[]; // urls
  vehicles: string[]; // urls
  starships: string[]; // urls
  created: string;
  edited: string;
  url: string;
  power: number;
}
