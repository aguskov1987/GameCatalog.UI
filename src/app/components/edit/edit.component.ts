import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Game, GameStatus, Genre, Platform } from '../../models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { environment } from '../../../environments/environment';
import { Utils } from '../../utils';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit, OnDestroy {
  public mode: 'new' | 'edit' = 'new';
  public game: Game = new Game();
  public apiUri = environment.apiUrl;
  public newImage: File | undefined = undefined;

  public gameForm!: FormGroup;
  public genres = Object.values(Genre).filter(value => typeof value === 'number');
  public platforms = Object.values(Platform).filter(value => typeof value === 'number');
  public statuses = Object.values(GameStatus).filter(value => typeof value === 'number');

  private readonly unsubscribe$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService) { }

  public ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mode = 'edit';
        this.loadGame(Number(id));
      } else {
        this.mode = 'new';
      }
    });

    this.gameForm = this.fb.group({
      title: [this.game.title, [Validators.required, Validators.maxLength(100)]],
      description: [this.game.description, [Validators.maxLength(500)]],
      genre: [this.game.genre, Validators.required],
      platform: [this.game.platform, Validators.required],
      publisher: [this.game.publisher, Validators.maxLength(100)],
      developer: [this.game.developer, Validators.maxLength(100)],
      releaseYear: [this.game.releaseYear, [Validators.min(1950), Validators.max(new Date().getFullYear())]],
      price: [this.game.price, [Validators.min(0)]],
      status: [this.game.status, Validators.required]
    });
  }

  public onFileSelected(event: Event) {
    let element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      this.newImage = element.files[0];
    }
  }

  public getGenreLabel(genre: Genre): string {
    return Utils.getGameGenre(genre);
  }

  public getPlatformLabel(platform: Platform): string {
    return Utils.getGamePlatform(platform);
  }

  public getStatusLabel(status: GameStatus): string {
    return Utils.getGameStatus(status);
  }

  public saveGame() {
    this.gameForm.markAllAsTouched();
    if (this.gameForm.valid) {
      this.updateGameData();

      if (this.mode === 'new') {
        this.gameService.addGame(this.game).pipe(takeUntil(this.unsubscribe$)).subscribe((savedId: number) => {
          if (!this.newImage) {
            this.router.navigate(['/']);
          } else {
            this.uploadImage(savedId);
          }
        });
      } else {
        this.gameService.updateGame(this.game).pipe(takeUntil(this.unsubscribe$)).subscribe((savedId: number) => {
          if (!this.newImage) {
            this.router.navigate(['/']);
          } else {
            this.uploadImage(savedId);
          }
        });
      }
    }
  }

  public goBack() {
    this.router.navigate(['/']);
  }

  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private uploadImage(id: number) {
    if (this.newImage) {
      this.gameService.uploadImage(this.newImage, id).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  private updateGameData() {
    this.game.title = this.gameForm.value.title;
    this.game.description = this.gameForm.value.description;
    this.game.genre = Number(this.gameForm.value.genre);
    this.game.platform = Number(this.gameForm.value.platform);
    this.game.publisher = this.gameForm.value.publisher;
    this.game.developer = this.gameForm.value.developer;
    this.game.releaseYear = this.gameForm.value.releaseYear;
    this.game.price = this.gameForm.value.price;
    this.game.status = Number(this.gameForm.value.status);
  }

  private loadGame(id: number) {
    this.gameService.getGameById(id).pipe(takeUntil(this.unsubscribe$)).subscribe(game => {
      this.game = game;
      if (this.gameForm) {
        this.gameForm.patchValue({
          title: game.title,
          description: game.description,
          genre: game.genre,
          platform: game.platform,
          publisher: game.publisher,
          developer: game.developer,
          releaseYear: game.releaseYear,
          price: game.price,
          status: game.status
        });
      }
    });
  }
}
