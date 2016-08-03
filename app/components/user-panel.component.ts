import {Component, Pipe, PipeTransform} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Artist,GalleryArtist} from '../../app/artist';
import {ArtPiece} from '../../app/art-piece';
import {ArtistDetailComponent} from './artist-detail.component';
import {MessagesComponent} from './messages.component';
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
  directives: [ROUTER_DIRECTIVES, RouterLink, NewWork, NewUser,MessagesComponent],
  providers:[DatabaseService]
})

export class UserPanelComponent {
  public type: string;
  public works: ArtPiece[] = [];
  public galleries: Gallery[] = [];
  public gallery_id:string[] = []
  public base: any;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  public isLoggedIn: boolean = false;
  public userPath: string;
  public user: GalleryArtist;
  public artist: Artist;
  public numWorks: number;
  public maxNumWorks:number = 15;
  public maxNumGals:number = 5;
  public numGals: number;
  public workPerc: number;
  public galPerc: number;
  public noEdit: boolean = true;
  public work: WorkUpLoad;
  public workToDelete: any;
  public galleryToDelete:any;
  public editUser: boolean = false;
  public displayGalleries = false;
  public displayWorks = false;
  public numMesRec: number;
  public numMesSent: number;
  public galIndex:any;

  // construct widget.
  // authenticate firebase user
  constructor(private _databaseService: DatabaseService) {
    this._updateData();
  }

  _updateData(){
    var user = firebase.auth().currentUser;
    this.base = firebase.database().ref();
    if (user){
      this.isLoggedIn = true;
      this.userPath = 'users/' + user.uid;
      this.base.child(this.userPath).once("value", (data) => {
        this.user = data.val();
        this._initiateObjects(this.user);
      });
      this._databaseService.checkChildNumber('messages/' + user.uid + '/received').then((data)=>{this.numMesRec = data});
      this._databaseService.checkChildNumber('messages/' + user.uid + '/sent').then((data)=>{this.numMesSent = data});
    } else {
      this.isLoggedIn = false;
    }
  }


  _initiateObjects(_user:GalleryArtist){
    //already have it from getting user before
    this.numWorks = 0;
    this.numGals = 0;
    this.works = [];
    this.galleries = [];
    this.gallery_id = [];
    for (var i in _user.Works) {
      this.works[this.numWorks] = _user.Works[i];
      this.works[this.numWorks]['_id'] = i;
      this.numWorks = this.numWorks + 1;
    }
    for (var i in _user.Galleries) {
      this.galleries[this.numGals] = _user.Galleries[i];
      this.gallery_id[this.numGals] = i;
      this.numGals = this.numGals + 1;
    }
    if (this.numGals > 0){
        this.galPerc = this.numGals/this.maxNumGals*100;
        this.displayGalleries = true;
    }
    if (this.works.length > 0){
        this.workPerc = this.numWorks/this.maxNumWorks*100;
        this.displayWorks = true;
    }
  }


  // Function to set up editing template
  edit(picture){
    var pic_id = picture.split('/').pop(-1);
    this.noEdit = false;
    this.base.child(this.userPath).child('Works').child(pic_id).once("value", (data) =>{
        this.work = data.val();
        this.work._id = pic_id;
    });
  }

  selectWork(work:string){
    this.workToDelete = work;
  }

  selectGallery(gallery:string,index:any){
    this.galIndex = index;
    this.galleryToDelete = gallery;
  }

  deleteGallery(){
    //need to remove from both places it is contained
    if (this.user.id == this.galleryToDelete.user_id){
      var path = 'Galleries/'  + this.galleryToDelete.id;
      this._databaseService.removeObject(path).then((error)=>{
        if (error){
          console.log(error)
        }
     });
     var path = 'users/'  + this.galleryToDelete.user_id + '/Galleries/' + this.gallery_id[this.galIndex];
     this._databaseService.removeObject(path).then((error)=>{
       if (error){
         console.log(error)
       }else{
        this._updateData();
       }
    });
    }
  }

  //assumes that this.workToDelete has been called
  deleteWork(){
    if (this.user.id == this.workToDelete.artist_id){
      var path = 'users/' + this.workToDelete.artist_id + '/Works/' + this.workToDelete._id;
      this._databaseService.removeObject(path).then((error)=>{
        if (error){
          console.log(error)
        }else{
         this._updateData();
        }
     });
    }

  }
    // Function to set up profile editing
    editProfile(){
      this.noEdit = false;
      this.editUser = true;
    }

  //handle when image is submitted
  handleDoneEvent(evt){
    this.noEdit = true;
    this.work = null;
    this.editUser = false;
    alert('work edited');
  }
}
