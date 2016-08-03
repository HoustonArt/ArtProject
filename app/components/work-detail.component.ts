import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {RouteParams,ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {ArtistService} from '../../app/services/artists.service';
import {DatabaseService} from '../../app/services/database.service';
import {ArtPiece} from '../../app/art-piece';
import {NgStyle} from 'angular2/common';
import {LoginService} from '../../app/services/login.service';
import {MessageWriter} from './messages.component';



@Component({
  selector: 'work-detail',
  templateUrl : './partials/work.html',
  inputs: ['work'],
  providers: [ArtistService, LoginService, DatabaseService],
  directives: [RouterLink, NgStyle, MessageWriter, ROUTER_DIRECTIVES]
})

export class WorkDetailComponent {
  public work: ArtPiece;
  public artist: Artist;
  id: string;
  public location: Location;
  public selectedFile: string;
  public selectedIndex: number;
  public isLoggedIn:boolean;
  public uid: string;
  public ownsWork: boolean = false;
  public router: Router;


  constructor(params:RouteParams,
              location:Location,
              router: Router,
              private _artistService: ArtistService,
              private _loginService: LoginService,
              private _databaseService: DatabaseService){
    this.router = router;
    this.location = location;
    this._loginService.getUID().then((snap)=>{
        this.isLoggedIn = snap['isLoggedIn'];
        this.uid = snap['uid'];
    });

  }

  deleteWork(){
    var path = this.location.path().split('/').slice(-1).pop()
    var path1 = path.split('@')[0];
    var path2 = path.split('@').slice(-1).pop();
    if (this.uid == this.work.artist_id){
      this._databaseService.removeObject('users/' + path1 + '/Works/' + path2).then((error)=>{
        if (error){
          console.log(error)
        }else{
         this.router.parent.navigate(['/Artist', {id: this.artist.id}]);
        }
      });
    }
  }

  getInformation(path1,path2) {
    var path = 'users/' + path1;
    this._databaseService.getObject(path).then((data) =>{
        this.artist = data;
        this.work = data['Works'][path2];
        if (this.uid == data['id']){
          this.ownsWork = true;
        }
      }
    );
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
    var path1 = path.split('@')[0];
    var path2 = path.split('@').slice(-1).pop();
    //this.getWork(path1, path2);
    this.getInformation(path1, path2);
  }
}
