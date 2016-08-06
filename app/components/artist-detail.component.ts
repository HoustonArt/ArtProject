import {Component} from 'angular2/core';
import {MessageWriter} from './messages.component';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {RouteParams,RouterLink} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {LoginService} from '../../app/services/login.service';


@Component({
  selector: 'artist-detail',
  templateUrl : './partials/artist.html',
  inputs: ['artist'],
  providers: [LoginService],
  directives: [RouterLink,MessageWriter]
})

export class ArtistDetailComponent {
  public artist: Artist;
  public id: string;
  public path:string;
  public location: Location;
  public works: ArtPiece[] = [];
  public isLoggedIn:boolean;
  public uid: string;


  constructor(params:RouteParams,location:Location,
             private _loginService: LoginService){
    this.location = location;
    this._loginService.getUID().then((snap)=>{
        this.isLoggedIn = snap['isLoggedIn'];
        this.uid = snap['uid'];
    });
  }

  getArtist() {
    var base = firebase.database().ref().child('users').child(this.path);
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
