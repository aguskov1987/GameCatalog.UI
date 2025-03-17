import { GameService } from './game.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('GameService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GameService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new GameService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch game list', () => {
    const mockGames = [
      { id: 1, title: 'Game 1' },
      { id: 2, title: 'Game 2' }
    ];

    httpClientSpy.get.and.returnValue(of(mockGames));

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(mockGames);
    });
  });
});
