import {Component} from 'angular2/core';
import {MessageWriter} from './messages.component';
import {Artist} from '../../app/artist';
import {GalleryArtist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {Gallery} from '../../app/gallery';
import {RouteParams, RouterLink} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {LoginService} from '../../app/services/login.service';


@Component({
  selector: 'artist-detail',
  templateUrl: './partials/artist.html',
  inputs: ['artist'],
  providers: [LoginService],
  directives: [RouterLink, MessageWriter]
})

export class ArtistDetailComponent {
  public artist: GalleryArtist;
  public id: string;
  public path: string;
  public location: Location;
  public works: ArtPiece[] = [];
  public gals: Gallery[] = [];
  public isLoggedIn: boolean;
  public uid: string;
  public noGals: boolean = true;
  public noWorks: boolean = true;


  constructor(params: RouteParams, location: Location,
    private _loginService: LoginService) {
    this.location = location;
    this._loginService.getUID().then((snap) => {
      this.isLoggedIn = snap['isLoggedIn'];
      this.uid = snap['uid'];
    });
  }

// return a promise to try to get it to not throw a bug
// I think angular thinks these lists are really longer than they should be
// fixed the bug by basically just checking in HTML if each loop is proper.
  getArtist():any {
    var base = firebase.database().ref().child('users').child(this.path);
    return Promise.resolve(base.once("value", (data) => {
      this.artist = data.val();
      var k = 0;
      if (this.artist.Works) {
        for (var i in this.artist.Works) {
          this.works[k] = this.artist.Works[i];
          this.works[k]['_id'] = i;
          k = k + 1;
        }
      }
      k = 0;
      if (this.artist.Galleries) {
        for (var j in this.artist.Galleries) {
          this.gals[k] = this.artist.Galleries[j]
          k = k + 1;
        }
      }
    })).then(()=>{
      var len_arr = [this.gals.length, this.works.length]
      return Promise.resolve(len_arr);
    })
  }

  ngOnInit() {
    this.path = this.location.path().split('/').slice(-1).pop();
    this.getArtist().then((arr)=>{
      if (arr[1] > 0){
        this.noWorks = false;
      }
      if(arr[0] > 0){
        console.log(this.gals);
        this.noGals = false;
      }
    });
  }
}
