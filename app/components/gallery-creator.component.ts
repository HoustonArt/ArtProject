import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ArtistService} from '../../app/services/artists.service';
import {DatabaseService} from '../../app/services/database.service';
import {LoginService} from '../../app/services/login.service';
import {ArtPiece} from '../../app/art-piece';
import {Gallery, GalleryContainer} from '../../app/gallery';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'gallery-creator',
  templateUrl: './partials/gallery-creator.html',
  styles: [`

  .color-box {
      width: 20px;
      height: 20px;
      display: inline-block;
      margin-right:5px;
      border: 1px solid black;
  }
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}`],
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [ArtistService, DatabaseService, LoginService],
})



export class GalleryCreatorComponent {
  public guideView: boolean = true;
  public guidePage: number = 0;
  public maxGals: any;
  public router: Router;
  public works: ArtPiece[];
  public displayedWorks: ArtPiece[];
  public preview: number;
  public _model = new Gallery('', '', '', '', '', '#FFF', '#FFF', 'img');
  public model = new GalleryContainer(this._model, []);
  public Artists: Artist[];
  public url: string;
  public full_url: string;
  public artheight: number[] = [200, 120, 340, 250, 500, 450];
  public containHeight: number = 340;
  public picHeight: number = 250;
  public user: string;
  public isLoggedIn: boolean;
  public checkedLogin: boolean;
  public message: string;
  public colors: string[] = ['#FFF', '#FF5733', '#3349FF',
    '#FFF133', '#40FF33', '#FE33FF', '#000']

  constructor(private _artistService: ArtistService,
              router: Router,
              private _databaseService: DatabaseService,
              private _loginService: LoginService) {
    this.router = router;
  }

  //authenticate if information has been submitted
  //go to next page if it has
  nextPageGal() {
    this.message = '';
    switch(this.guidePage){
      case 0:
        if (this.model.info.name != '') {
          this.guidePage = 1;
        } else {
          this.message = "You must enter a name";
        }
        break;

    case 1:
      if (this.model.info.curator != '') {
        this.guidePage = 2;
      } else {
        this.message = 'You must name a curator';
      }
      break;

    case 2:
      this.guideView = false;
      break;
  }
}

  previousPageGal() {
    this.guidePage = this.guidePage - 1;
  }

  setHeights(size) {
    if (size == 'sm') {
      this.containHeight = 200;
      this.picHeight = 120;
    }
    else if (size == 'lg') {
      this.containHeight = 580;
      this.picHeight = 500;
    }
    else {
      this.containHeight = 300;
      this.picHeight = 220;
    }
  }


  ngOnInit() {
    this._artistService.getArtists().then(Artists => this.Artists = Artists);
    this._artistService.getAllWorks().then(works => this.works = works).then(works => this.displayedWorks = this.works);

    this._loginService.getUID().then((data) => {
      this.user = data['uid'];
      this.model.info.user_id = this.user;
      this.isLoggedIn = data['isLoggedIn'];
      this._artistService.getMaxNumGalleries(this.user).then((ret)=>{
        this.maxGals = ret;
      })
    }).then(() => {
      this.checkedLogin = true
    });
  }

  //create link to page by adding firebase url
  createPage() {
    if (this.user) {
      this.createGallery();
    }
    else {
      this.message = 'Sorry, you need to be logged in to create Galleries.  Make an account for free by clicking Login and then signing up!';
    }
  }

  createGallery() {
    var path = 'users/' + this.user + '/Galleries';
    this._databaseService.checkChildNumber(path).then((num) => {
      if (num < this.maxGals) {
        this._databaseService.pushToDatabase('Galleries', this.model).then((ref) => {
          var _id = ref.key.split('/').pop()
          this.url = _id;
          this.full_url = 'artlike.io/#/gallery-view/' + _id;
          this.model.info.id = _id;
          this._databaseService.pushToDatabase(path, this.model.info);

        });
      }
      else {
        this.message = 'You have reached your allotment of Galleries'
      }

    });
  }


  //filter artists when selected by first and last name
  //should make this by id at some point.....
  filterArtists(artist) {
    if (artist == 'All' || artist == null) {
      this.displayedWorks = this.works;
    }
    else {
      var fn = artist.split(",")[1].trim();
      var ln = artist.split(",")[0].trim();
      this.displayedWorks = this.works.filter(a => a.artist_fname == fn && a.artist_lname == ln);
    }
  }


  //remove work from gallery works if button is clicked
  removeWork(work) {
    this.model.works = this.model.works.filter(a => a != work);
  }

  //what to do if selected
  onSelect(work) {
    this.model.works.push(work);
  }

  onBackgroundClick(color) {
    this.model.info.backgroundColor = color;
  }

  onTextClick(color) {
    this.model.info.textColor = color;
  }

  onBorderClick(style) {
    this.model.info.borderStyle = style;
  }

  //setup preview modal
  previewPage() {
    this.preview = 1;
  }
  //exit from preview
  exitPreview() {
    this.preview = 0;
  }
}
