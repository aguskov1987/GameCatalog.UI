export enum Genre {
  Unknown,
  Action,
  Adventure,
  Fighting,
  Platform,
  Puzzle,
  Racing,
  RolePlaying,
  Shooter,
  Simulation,
  Sports,
  Strategy
}

export enum Platform {
  Unknown,
  PC,
  PlayStation,
  Xbox,
  Nintendo,
}

export enum GameStatus {
  Archived,
  Active,
}

export class Game {
  public id?: number;
  public title?: string;
  public description?: string;
  public imageFileName?: string;
  public genre?: Genre;
  public platform?: Platform;
  public publisher?: string;
  public developer?: string;
  public releaseYear?: number;
  public price?: number;
  public status?: GameStatus;
}