import {Component} from 'angular2/core';
import {Artist} from './artist';
import {RouteParams,Location,RouterLink} from 'angular2/router';
import {ArtistService} from './artists.service';

@Component({
  selector: 'artist-detail',
  templateUrl : './partials/artist.html',
  inputs: ['artist'],
  providers: [ArtistService],
  directives: [RouterLink]
})

export class ArtistDetailComponent {
  public artist: Artist;
  id: string;
  path:string;
  public location: Location;

  constructor(params:RouteParams,location:Location, public _artistService: ArtistService){
    this.location = location;
  }

  getArtist() {
    this._artistService.getArtist(this.path).then(artist => this.artist = artist);
  }

  ngOnInit() {
    this.path = this.location.path().split('/').slice(-1).pop();
    this.getArtist();
  }
}
