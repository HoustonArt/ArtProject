import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistDetailComponent} from './artist-detail.component';

@Component({
  selector: 'user-panel',
  templateUrl: './partials/user-panel.html',
  styles: [`
    .ng-valid[required] {
    border-left: 5px solid #42A948;
      }

    .ng-invalid {
      border-left: 5px solid #a94442;
    }
      `],
  directives: [ROUTER_DIRECTIVES, RouterLink],
})

export class UserPanelComponent {
  public type: string;
  public works: ArtPiece[];
  public base: any;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  public isLoggedIn: boolean = false;
  public userPath: string;
  public user: User;
  public artist: Artist;
  public numWorks: number;
  public noEdit: boolean = true;
  public dataRecieved: boolean = false;

  constructor() {
    this.base = new Firebase(this.firebaseUrl);
    this.base.onAuth((authdata) => {
      this.authDataCallback(authdata);
    });
  }

  authDataCallback(authData) {
    if (authData) {
      this.isLoggedIn = true;
      this.userPath = 'users/' + authData.uid;
      this.base.child(this.userPath).once("value", (data) => {
        this.user = data.val();
      });
    } else {
      this.isLoggedIn = false;
    }
  }

   ngOnInit() {
    this.base.child(this.userPath).once("value", (data) => {
      this.artist = data.val();
      this.numWorks = 0;
      this.works = []
      for (var i in this.artist.Works) {
        this.works[this.numWorks] = this.artist.Works[i];
        this.numWorks = this.numWorks + 1;
      }
      this.dataRecieved = true;
    })
  }
  // Function to set up editing template
  edit(picture){
    var pic_id = picture['src'].split('/').pop(-1);
    console.log(pic_id);

  }
}
