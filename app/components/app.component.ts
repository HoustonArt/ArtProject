import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink} from 'angular2/router';
import {ArtistDetailComponent} from './artist-detail.component';
import {WorkDetailComponent} from './work-detail.component'
import {ArtistService} from '../../app/artists.service';
import {ArtistsComponent} from './artists.component';
import {AboutComponent} from './about.component';
import {HomeComponent} from './home.component';
import {AllWorksComponent} from './works.component';

@Component({
  selector: 'my-app',
  templateUrl: './partials/mainpage.html',
  directives: [ROUTER_DIRECTIVES, RouterLink]
})

@RouteConfig([
    {path: '/', component:HomeComponent, as:'Home'},
    {path: '/artists/', component: ArtistsComponent, as:'Artists'},
    {path: '/artist/:id',component: ArtistDetailComponent,as: 'Artist'},
    {path: '/about', component:AboutComponent, as: 'About'},
    {path: '/work/:id', component: WorkDetailComponent, as: 'Work'},
    {path: '/works/',component: AllWorksComponent, as: 'Works'}
])

export class AppComponent {
  public selectedArtist: string;
}
