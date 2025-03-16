import { GameStatus, Genre, Platform } from "./models/game";

export class Utils {
  static getGameStatus(status: GameStatus): string {
    switch (status) {
      case 0:
        return 'Archived';
      case 1:
        return 'Active';
      default:
        return 'Unknown';
    }
  }

  static getGameGenre(genre: Genre): string {
    switch (genre) {
      case 0:
        return 'Unknown';
      case 1:
        return 'Action';
      case 2:
        return 'Adventure';
      case 3:
        return 'Fighting';
      case 4:
        return 'Platform';
      case 5:
        return 'Puzzle';
      case 6:
        return 'Racing';
      case 7:
        return 'Role Playing';
      case 8:
        return 'Shooter';
      case 9:
        return 'Simulation';
      case 10:
        return 'Sports';
      case 11:
        return 'Strategy';
      default:
        return 'Unknown';
    }
  }

  static getGamePlatform(platform: Platform): string {
    switch (platform) {
      case 0:
        return 'Unknown';
      case 1:
        return 'PC';
      case 2:
        return 'PlayStation';
      case 3:
        return 'Xbox';
      case 4:
        return 'Nintendo';
      default:
        return 'Unknown';
    }
  }
}