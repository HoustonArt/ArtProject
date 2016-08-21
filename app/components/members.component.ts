import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtistService} from '../../app/services/artists.service';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'members',
  templateUrl : './partials/membersIndex.html',
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService],
})


export class MembersComponent {
  public artists:Array<Array<Artist>>;
  public router: Router;

  constructor(private _artistService: ArtistService, private _router: Router){
  }

  //get all the artists and group into group of 4
  ngOnInit() {
        this._artistService.getMembers().then((artists) => {
          var artists_list = [];
          for (var i in artists){
            var j = parseInt(i);
            if(j%4 === 0){
              artists_list.push(artists.slice(j,j+4));
            }
          }
          this.artists = artists_list;

        });
   }

  onSelect(artist: Artist) {
    this._router.parent.navigate(['/Artist', {id: artist.id}]);
  }
}