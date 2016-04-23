import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistDetailComponent} from './artist-detail.component';
import {WorkUpLoad} from '../../app/work-piece';
import {NewWork} from './new-work.component';

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
  directives: [ROUTER_DIRECTIVES, RouterLink, NewWork],
})

export class UserPanelComponent {
  public type: string;
  public works: ArtPiece[] = [];
  public base: any;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  public isLoggedIn: boolean = false;
  public userPath: string;
  public user: User;
  public artist: Artist;
  public numWorks: number;
  public noEdit: boolean = true;
  public work: WorkUpLoad;

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
  
  //get the artist information and build array of works from
  //the firebase
  getArtist(){
      this.base.child(this.userPath).once("value", (data) => {
      this.artist = data.val();
      this.numWorks = 0;
      for (var i in this.artist.Works) {
        this.works[this.numWorks] = this.artist.Works[i];
        this.numWorks = this.numWorks + 1;
      }
    })
  }

   //get the artist when the app loads
   ngOnInit() {
       this.getArtist();
   }
   
   //check if the work array is built yet so we don't
   //try to render things which are not yet here
   //it will hide the works if this function returns true
   workLengthCheck(){
       if (this.numWorks > 0){ return false; }
       else { return true; }
   }
  // Function to set up editing template
  edit(picture){
    var pic_id = picture['src'].split('/').pop(-1);
    this.noEdit = false;
    this.base.child(this.userPath).child('Works').child(pic_id).once("value", (data) =>{
        this.work = data.val();
    });
  }
}
