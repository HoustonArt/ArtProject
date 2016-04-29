import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Artist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistDetailComponent} from './artist-detail.component';
import {WorkUpLoad} from '../../app/work-piece';
import {NewWork} from './new-work.component';
import {NewUser} from './new-user.component';
import {DatabaseService} from '../../app/services/database.service';
import {Gallery} from '../../app/gallery';


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
  directives: [ROUTER_DIRECTIVES, RouterLink, NewWork, NewUser],
  providers:[DatabaseService]
})

export class UserPanelComponent {
  public type: string;
  public works: WorkUpLoad[] = [];
  public galleries: Gallery[] = [];
  public base: any;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  public isLoggedIn: boolean = false;
  public userPath: string;
  public user: User;
  public artist: Artist;
  public numWorks: number;
  public numGals: number;
  public noEdit: boolean = true;
  public work: WorkUpLoad;
  public editUser: boolean = false;
  public displayGalleries = false;
  public displayWorks = false;
  private tempPiece: ArtPiece;

  constructor(private _databaseService: DatabaseService) {
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

    ngOnInit(){
        var path = this.userPath + '/Works';
        this._databaseService.checkChildNumber(path).then((_num)=>{
           this.numWorks = _num;
        });
       
       this._databaseService.getObject(path).then((works)=>{
           for (var i in works){
               this.works.push(works[i]);
           }
        }).then(()=>{
           if (this.works.length > 0){
                this.displayWorks = true;
                console.log(this.works);
           }
       });
       
        var path1 = this.userPath + '/Galleries';
        
        this._databaseService.checkChildNumber(path1).then((_num)=>{
           this.numGals = _num;
        });
       
       //will return key value pairs, only want values
       this._databaseService.getObject(path1).then((data)=>{
           for (var i in data){
               this.galleries.push(data[i]);
           }
       }).then(()=>{
           if (this.galleries.length > 0){
                this.displayGalleries = true;
           }else{
               this.displayGalleries = false;
           }
        });
    }

   
  // Function to set up editing template
  edit(picture){
    var pic_id = picture['src'].split('/').pop(-1);
    this.noEdit = false;
    this.base.child(this.userPath).child('Works').child(pic_id).once("value", (data) =>{
        this.work = data.val();
        this.work._id = pic_id;
    });
  }

    // Function to set up profile editing
    editProfile(pic){
      this.noEdit = false;
      this.editUser = true;
    }

  //handle when image is submitted
  handleDoneEvent(evt){
    this.noEdit = true;
    this.work = null;
    this.editUser = false;
  }
}
