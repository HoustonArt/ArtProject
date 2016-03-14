import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {Work} from '../../app/art-piece';

@Component({
  selector: 'new-work',
  templateUrl: './partials/new-work.html',
  styles: [`
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}`],
  directives: [ROUTER_DIRECTIVES, RouterLink],
})



export class NewWork {
  public router: Router;
  public user: User;
  public work = new Work('','','','','',[],'',[],'','','',0);
  public message = '';
  public password: string;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  authData: any;
  isLoggedIn: string;

  constructor(router: Router) {
    this.router = router;
    this.ref = new Firebase(this.firebaseUrl);
    this.ref.onAuth((authdata)=>{
      this.authDataCallback(authdata);
    };)
  }


  authDataCallback(authData) {
    if (authData) {
      this.isLoggedIn = true;
      var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
      userBase.once("value", (data) => {
        this.user = data.val();
      });
    } else {
      this.isLoggedIn = false;
    }
  }


  createNewWork() {
    console.log(this.work)
}
