import {Component} from 'angular2/core';
import {Artist} from './artist';
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink} from 'angular2/router';
import {ArtistDetailComponent} from './artist-detail.component';
import {ArtistService} from './artists.service';
import {ArtistsComponent} from './artists.component';
import {AboutComponent} from './about.component';

@Component({
  selector: 'my-app',
  templateUrl: './partials/mainpage.html',
  directives: [ROUTER_DIRECTIVES, RouterLink]
})

@RouteConfig([
    {path: '/', component:ArtistsComponent, as:'Home'},
    {path: '/artist/:id',component: ArtistDetailComponent,as: 'Artist'},
    {path: '/about', component:AboutComponent, as: 'About'}
])

export class AppComponent {
  public selectedArtist: string;
}
