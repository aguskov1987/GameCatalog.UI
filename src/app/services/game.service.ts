import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Game } from '../models/game';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUri = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http
    .get<Game[]>(`${this.apiUri}/games`)
    .pipe(
      catchError(this.handleError));
  }

  getGameById(id: number): Observable<Game> {
    return this.http
    .get<Game>(`${this.apiUri}/game/${id}`)
    .pipe(
      catchError(this.handleError));
  }

  addGame(game: Game): Observable<number> {
    return this.http
    .post<number>(`${this.apiUri}/new-game`, game)
    .pipe(
      catchError(this.handleError));
  }

  updateGame(game: Game): Observable<number> {
    return this.http
    .put<number>(`${this.apiUri}/update-game/${game.id}`, game)
    .pipe(
      catchError(this.handleError));
  }

  uploadImage(image: File, id: number): Observable<number> {
    console.log(id);
    const formData = new FormData();

    formData.append('image', image);
    return this.http
    .post<number>(`${this.apiUri}/upload-image/${id}`, formData)
    .pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `A backend error occured with status: ${error.status}, and details: `, error.error);
    }
    return throwError(() => new Error('An error occured. Please check the console for more information.'));
  }
}
