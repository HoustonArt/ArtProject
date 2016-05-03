import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {RouteParams,RouterLink} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {ArtistService} from '../../app/services/artists.service';
import {ArtPiece} from '../../app/art-piece';
import {NgStyle} from 'angular2/common';
import {LoginService} from '../../app/services/login.service';
import {MessageWriter} from './messages.component';



@Component({
  selector: 'work-detail',
  templateUrl : './partials/work.html',
  inputs: ['work'],
  providers: [ArtistService, LoginService],
  directives: [RouterLink, NgStyle, MessageWriter]
})

export class WorkDetailComponent {
  public work: ArtPiece;
  public artist: Artist;
  id: string;
  path1: string;
  path2: string;
  public location: Location;
  public selectedFile: string;
  public selectedIndex: number;
  firebaseUrl: string = "https://artlike.firebaseIO.com/users/";
  public isLoggedIn:boolean;
  public uid: string;


  constructor(params:RouteParams,location:Location,
              private _artistService: ArtistService,
              private _loginService: LoginService){
    this.location = location;
    this._loginService.getUID().then((snap)=>{
        this.isLoggedIn = snap['isLoggedIn'];
        this.uid = snap['uid'];
    });
  }

  getWork(path1, path2) {
    var path = path1 + '/Works/' + path2;
    var base = new Firebase(this.firebaseUrl + path);
    base.once("value", (data) =>{
        this.work = data.val();
      }
    );
  }
  getArtist() {
    var path = this.firebaseUrl + this.path1;
    var base = new Firebase(path);
    base.once("value", (data)=>{
      this.artist = data.val();
    })
  }

  initGal(){
    this.selectedIndex = 0;
    this.selectedFile = this.work.files[0];
  }
  previous(){
    if(this.selectedIndex > 0){
      this.selectedIndex = this.selectedIndex - 1;
    }
    else{
      this.selectedIndex = this.work.numFiles-1;
    }
    this.selectedFile = this.work.files[this.selectedIndex];
  }
  next(){
    if(this.selectedIndex < this.work.numFiles-1){
      this.selectedIndex = this.selectedIndex + 1;
    }
    else{
      this.selectedIndex = 0;
    }
    this.selectedFile = this.work.files[this.selectedIndex];
  }
  
  ngOnInit() {
    var path = this.location.path().split('/').slice(-1).pop()
    this.path1 = path.split('@')[0];
    this.path2 = path.split('@').slice(-1).pop();
    this.getWork(this.path1, this.path2);
    this.getArtist();
  }
}
