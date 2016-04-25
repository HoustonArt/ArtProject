import {Component, Output, EventEmitter} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';

@Component({
  selector: 'login',
  templateUrl: './partials/login.html',
  styles: [`
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}`],
  directives: [ROUTER_DIRECTIVES, RouterLink]
})



export class Login {
  public username: string;
  public password: string;
  firebaseUrl:string = "https://artlike.firebaseIO.com/";
  public message : string = "";
  router: Router;
  @Output() loginevent: EventEmitter<any> = new EventEmitter();

  constructor(router: Router) {
    this.router = router;
  }

  loginUser() {
    var ref = new Firebase(this.firebaseUrl);
    ref.authWithPassword({
      "email": this.username,
      "password": this.password
    }, (error, authData) => {
        if (error) {
          this.message = error;
        } else {
          this.message = "Logged in, redirecting to ArtLike!";
          this.loginevent.next(authData);
        }
      });
  }

  createUser(){
    this.router.navigate(['NewUser']);
    this.loginevent.next("newUser");
  }
}
