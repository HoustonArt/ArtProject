import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistService} from '../../app/services/artists.service';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';

@Component({
  selector: 'home',
  templateUrl : './partials/homepage.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService],
})


export class HomeComponent {
  public title = 'Houston Artists';
  public artists: Artist[];
  public router: Router;
  public works: ArtPiece[];
  public isLoggedIn = false;

  constructor(private _artistService: ArtistService, router: Router){
    this.router = router;

  }
  getArtists() {
    this._artistService.getArtists().then(artists => this.artists = artists);
  }

  ngOnInit() {
    this.getArtists();
  }

  onSelect(artist: Artist) {
    this.router.parent.navigate(['/Artist', {id: artist.id}]);
  }
}
