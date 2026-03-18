import { Component, inject } from '@angular/core';
import {

  IonContent, IonItem, IonLabel, IonList,
  IonSearchbar, IonHeader, IonToolbar, IonTitle,
  IonBadge, IonIcon 

} from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';
import { MovieService } from 'src/app/core/services/movie.service';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonItem, IonLabel,
    IonList, IonSearchbar, RouterLink, IonHeader, IonToolbar, IonTitle, IonBadge, IonIcon],
})

export class HomePage {
  
  public movieService = inject(MovieService);

  constructor() {
    addIcons({ heart });
  }

  onSearch(event: any) {
    const query = event.detail.value;
    if (query) {
      this.movieService.searchMovies(query);
    }
  }
}

  