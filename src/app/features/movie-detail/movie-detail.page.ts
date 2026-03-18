import { Component, inject, OnInit } from '@angular/core';

import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonBackButton, IonButtons 
} from '@ionic/angular/standalone';

import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard,
    IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton, IonBackButton, IonButtons
  ]
})
export class MovieDetailPage implements OnInit {

  private route = inject(ActivatedRoute);
  public movieService = inject(MovieService);

  constructor() { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id);
    }
  }

  toggleFavorite() {
    const movie = this.movieService.currentMovie();
    if (movie) {
      this.movieService.toggleFavorite(movie);
    }
  }
}
