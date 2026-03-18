import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OMDbMovie, OMDbSearchApiResponse } from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {

  private http = inject(HttpClient);

  private readonly API_URL = `https://www.omdbapi.com/?apikey=${environment.apiKeyOMDb}`;
  private _movies = signal<OMDbMovie[]>([]);
  public movies = this._movies.asReadonly();
  public totalResults = computed(() => this._movies().length);

  searchMovies(title: string) {
    this.http.get<OMDbSearchApiResponse>(`${this.API_URL}&s=${title}`)
      .subscribe(response => {
        if (response.Response === 'True') {
          this._movies.set(response.Search);
        } else {
          this._movies.set([]);
        }
      });
  }

  private _currentMovie = signal<OMDbMovie | null>(null);
  public currentMovie = this._currentMovie.asReadonly();

  getMovieDetails(id: string) {
    this.http.get<OMDbMovie>(`${this.API_URL}&i=${id}`)
      .subscribe(movie => this._currentMovie.set(movie));
  }

  private _favorites = signal<OMDbMovie[]>([]);
  public favorites = this._favorites.asReadonly();
  public totalFavorites = computed(() => this._favorites().length);

  toggleFavorite(movie: OMDbMovie) {
    const exists = this._favorites().some(m => m.imdbID === movie.imdbID);
    if (exists) {
      this._favorites.update(list => list.filter(m => m.imdbID !== movie.imdbID));
    } else {
      this._favorites.update(list => [...list, movie]);
    }
  }

  isFavorite(id: string): boolean {
    return this._favorites().some(m => m.imdbID === id);
  }
}