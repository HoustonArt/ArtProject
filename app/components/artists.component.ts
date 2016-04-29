import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtistService} from '../../app/services/artists.service';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';

@Component({
  selector: 'artists',
  templateUrl : './partials/artistIndex.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService],
})


export class ArtistsComponent {
  public title = 'Houston Artists';
  public artists: Artist[];
  public router: Router;

  constructor(private _artistService: ArtistService, router: Router){
    this.router = router;
  }

  ngOnInit() {
        this._artistService.getArtists().then(artists => this.artists = artists);
   }

  onSelect(artist: Artist) {
    this.router.parent.navigate(['/Artist', {id: artist.id}]);
  }
}
