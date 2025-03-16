import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  imports: [CurrencyPipe],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss'
})
export class BrowseComponent implements OnInit, OnDestroy {
  public games: Game[] = [];
  public apiUri = environment.apiUrl;

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(private router: Router, private gameService: GameService) {

  }

  public ngOnInit(): void {
    this.gameService.getGames().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (games: Game[]) => {
        this.games = games;
        console.log(this.games);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  public addNewGame() {
    this.router.navigate(['/new']);
  }

  public editGame(game: Game) {
    this.router.navigate([`/edit/${game.id}`]);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
