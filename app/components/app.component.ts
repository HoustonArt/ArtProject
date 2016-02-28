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
import {ArtSearchComponent} from './art-search.component';
import {GalleryCreatorComponent} from './gallery-creator.component';
import {GalleryViewerComponent} from './gallery-viewer.component';
import {NewUser} from './new-user.component';

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
    {path: '/works/',component: AllWorksComponent, as: 'Works'},
    {path:'/artsearch/',component: ArtSearchComponent, as: 'ArtSearch'},
    {path:'/gallery-create/',component: GalleryCreatorComponent, as:'GalleryCreate'},
    {path:'/gallery-view/:id',component: GalleryViewerComponent, as:'GalleryView'},
    {path:'/new-user/', component: NewUser, as:'NewUser'}
])

export class AppComponent {
  public selectedArtist: string;
}
