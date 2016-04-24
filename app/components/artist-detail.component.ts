import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {RouteParams,Location,RouterLink} from 'angular2/router';

@Component({
  selector: 'artist-detail',
  templateUrl : './partials/artist.html',
  inputs: ['artist'],
  providers: [],
  directives: [RouterLink]
})

export class ArtistDetailComponent {
  public artist: Artist;
  id: string;
  path:string;
  public location: Location;
  firebaseUrl: string = "https://artlike.firebaseIO.com/users/";
  public works: ArtPiece[] = [];


  constructor(params:RouteParams,location:Location){
    this.location = location;
  }

  getArtist() {
    var path = this.firebaseUrl + this.path;
    var base = new Firebase(path);
    base.once("value", (data)=>{
      this.artist = data.val();
      var k = 0;
      for (var i in this.artist.Works){
        this.works[k] = this.artist.Works[i];
        this.works[k]['_id'] = i;
        k = k +1;
      }
    })
  }

  ngOnInit() {
    this.path = this.location.path().split('/').slice(-1).pop();
    this.getArtist();
  }
}
