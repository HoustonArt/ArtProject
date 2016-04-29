import {Component} from 'angular2/core';
import {ArtPiece} from '../../app/art-piece';
import {ArtistService} from '../../app/services/artists.service';
import {LoginService} from '../../app/services/login.service';
import {ROUTER_DIRECTIVES, RouterLink,Router} from 'angular2/router';
import {User} from '../../app/user';


@Component({
  selector:'art-search',
  templateUrl: './partials/art-search.html',
  providers: [ArtistService, LoginService],
  directives:[ROUTER_DIRECTIVES,RouterLink]
})

export class ArtSearchComponent {
  public works: ArtPiece[];
  public selectedFile: string;
  public selectedIndex: number;
  public notStarted: boolean;
  public user: User;
  public isLoggedIn: boolean;
  private ref: any;
  private newRef: any;
  private checkedLogin: boolean = false;

  constructor(public _artistService: ArtistService, private _loginService: LoginService){
    this.ref = new Firebase("https://artlike.firebaseIO.com/")
    this._loginService.getUID().then((data)=>{
        this.user = data['uid'];
        this.isLoggedIn = data['isLoggedIn'];
    }).then(()=>{this.checkedLogin=true});
  }


  getWorks() {
    this._artistService.getSomeWorks(10).then(works => this.works=works);
  }
  
  ngOnInit() {
    this.getWorks();
    this.notStarted = true;
  }

  //create firebase database to hold stuff
  // if no user authentication, store as anonymous
  initGal(){
    this.notStarted = false;
    this.selectedIndex = 0;
    this.selectedFile = this.works[0].mainFile;
    this.newRef = this.ref.child('artSearch').push()
    if (this.isLoggedIn){
      this.newRef.set({"user":this.user,
          "time":Date.now()
      });
    }
    else{
      this.newRef.set({"user":"anonymous",
          "time":Date.now()
      });
    }
  }

  hate(){
    this.pushAnswer(0, this.works[this.selectedIndex])
    this.next();
  }
  meh(){
    this.pushAnswer(1, this.works[this.selectedIndex])
    this.next();
  }
  okay(){
    this.pushAnswer(2, this.works[this.selectedIndex])
    this.next();
  }
  love(){
    this.pushAnswer(3, this.works[this.selectedIndex])
    this.next();
  }

  pushAnswer(val:number, work:ArtPiece){
    this.newRef.push({"workID":work._id,
      "rating":val.toString(),
       "artist":work.artist_id});
  }

  next(){
    if(this.selectedIndex < 10){
      this.selectedIndex = this.selectedIndex + 1;
    }
    else{
      this.selectedIndex = 0;
    }
    this.selectedFile = this.works[this.selectedIndex].mainFile;
  }

}
