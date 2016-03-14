import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';

@Component({
  selector: 'new-user',
  templateUrl: './partials/new-user.html',
  styles: [`
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}`],
  directives: [ROUTER_DIRECTIVES, RouterLink],
})



export class NewUser {
  public router: Router;
  public user = new User('', '', '', '', '', '', '', '');
  public message = '';
  public password;
  firebaseUrl: string;
  authData: any;

  constructor(router: Router) {
    this.router = router;
    this.firebaseUrl = "https://artlike.firebaseIO.com/";
  }



  createNewUser() {
    var ref = new Firebase(this.firebaseUrl);
    ref.createUser({
      email: this.user.email,
      password: this.password
    }, (error, userData) => {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              this.message = "The new user account cannot be created because the email is already in use.";
              break;
            case "INVALID_EMAIL":
              this.message = "The specified email is not a valid email.";
              break;
            default:
              console.log("Error creating user:", error);
          }
        } else {
          this.message = "Successfully created user account";
          //now login and set user data
          ref.authWithPassword({
            email: this.user.email,
            password: this.password
          }, (error, authData) => {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                console.log("Authenticated successfully with payload:", authData);
                var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
                this.user.id = authData.uid;
                userBase.set(this.user);
              }
            });
        }
      });
      ref.unauth();
      this.router.parent.navigate(['Home']);
  }
}
