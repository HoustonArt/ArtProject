import {Component} from 'angular2/core';
import {Artist} from '../../app/artist';
import {ROUTER_DIRECTIVES, RouteConfig, RouterLink, Router} from 'angular2/router';
import {ArtistDetailComponent} from './artist-detail.component';
import {WorkDetailComponent} from './work-detail.component'
import {ArtistsComponent} from './artists.component';
import {AboutComponent} from './about.component';
import {HomeComponent} from './home.component';
import {AllWorksComponent} from './works.component';
import {ArtSearchComponent} from './art-search.component';
import {GalleryCreatorComponent} from './gallery-creator.component';
import {GalleryViewerComponent} from './gallery-viewer.component';
import {NewUser} from './new-user.component';
import {Login} from './login.component';
import {User} from '../../app/user';
import {NewWork} from './new-work.component';
import {UserPanelComponent} from './user-panel.component';
import {MessagesComponent} from './messages.component';
import {DocumentationComponent} from './documentation.component';
import {MembersComponent} from './members.component';
@Component({
  selector: 'my-app',
  templateUrl: './partials/mainpage.html',
  directives: [ROUTER_DIRECTIVES, RouterLink, Login],
  styles: [`[hidden] {display: none;},
    .navbar ul li{
    display:inline-block;
    }

    body{
      margin-bottom:30px
    }

 .footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:30px;
     }


 footerList {
     width: 100%;
     margin:0;
     padding:0;
 }
 .footerLink{
     display:inline;
 }

 .footerLink a {
     color: #115;
     padding: 8px 8px 8px 8px;
     text-decoration:none;

 }

 .footerLink a:hover{
     background-color: #555;
     color:white;
 }
     `]
})

@RouteConfig([
  { path: '/', component: HomeComponent, as: 'Home' },
  { path: '/artists/', component: ArtistsComponent, as: 'Artists' },
  { path: '/artist/:id', component: ArtistDetailComponent, as: 'Artist' },
  { path: '/about', component: AboutComponent, as: 'About' },
  { path: '/work/:id', component: WorkDetailComponent, as: 'Work' },
  { path: '/works/', component: AllWorksComponent, as: 'Works' },
  { path: '/artsearch/', component: ArtSearchComponent, as: 'ArtSearch' },
  { path: '/gallery-create/', component: GalleryCreatorComponent, as: 'GalleryCreate' },
  { path: '/gallery-view/:id', component: GalleryViewerComponent, as: 'GalleryView' },
  { path: '/new-user/', component: NewUser, as: 'NewUser' },
  { path: '/new-work/', component: NewWork, as: 'NewWork' },
  { path: '/user-panel/', component: UserPanelComponent, as: 'User'},
  { path: '/docs/', component: DocumentationComponent, as: 'Docs'},
  { path: '/members/', component: MembersComponent, as: 'Members'}
])

export class AppComponent {
  public selectedArtist: string;
  public isLoggedIn: boolean = false;
  doLogin: boolean = false;
  uid: string;
  ref: any;
  router: Router;
  authData: any;
  hideModal: boolean = true;
  user: User;
  numWorks: number;

  constructor(router: Router) {
    this.router = router;
    this.ref = firebase.database().ref();
    this.authLogin();
  }



  authLogin() {
    var user = firebase.auth().currentUser;
    if (user){
      this.isLoggedIn = true;
      this.user = user;
      var userBase = this.ref.child('users').child(user.uid);
      userBase.once("value", (data) => {
        this.user = data.val();
        this.numWorks = data.child('Works').numChildren();
      });
    }

  }

  createLogin() {
    this.hideModal = false;
  }

  logOut() {
    firebase.auth().signOut();
    this.isLoggedIn = false;
    this.user = null;
  }

  accountInfo(){
    var outstr = '';
    if (this.user){
      outstr += 'Welcome to ArtLike ' + this.user.firstName + '\n';
      outstr += 'You have ' + this.numWorks.toString() + ' works!'
    }
    else{
      outstr += 'Not logged in';
    }
    alert(outstr);
  }

  handleLoginEvent(arg) {
    this.hideModal = true;
    if (arg != "newUser") {
      this.authLogin();
    }
  }
}
