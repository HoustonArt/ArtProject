import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';


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
  public works: ArtPiece[] = [];
  public base: any;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  public isLoggedIn: boolean = false;
  public userPath: string;
  public user: User;

  constructor() {
    this.base = new Firebase(this.firebaseUrl);
    this.base.onAuth((authdata) => {
      this.authDataCallback(authdata);
    });
    this.getArtist();
  }

  authDataCallback(authData) {
    if (authData) {
      this.isLoggedIn = true;
      this.userPath = 'users/' + authData.uid;
      this.base.child(this.userPath).once("value", (data) => {
        this.user = data.val();
        console.log(this.user)
      });
    } else {
      this.isLoggedIn = false;
    }
  }

  getArtist() {
    this.base.child(this.userPath).once("value", (data) => {
      this.artist = data.val();
      var k = 0;
      for (var i in this.artist.Works) {
        this.works[k] = this.artist.Works[i];
        k = k + 1;
      }
    })
  }
}
