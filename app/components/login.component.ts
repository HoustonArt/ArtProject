import {Component, Output, EventEmitter} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {LoginService} from '../../app/services/login.service';


@Component({
  selector: 'login',
  templateUrl: './partials/login.html',
  styles: [`
    .ng-valid[required] {
  border-left: 5px solid #42A948;
    }

.ng-invalid {
  border-left: 5px solid #a94442;
}

 @media screen and (max-width: 400px) {
   .loginrow {
       padding-top:75px;
   }

}
`],
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: [LoginService]
})



export class Login {
  public username: string;
  public password: string;
  public token: string;

  firebaseUrl:string = "https://artlike.firebaseIO.com/";
  public message : string = "";
  router: Router;
  @Output() loginevent: EventEmitter<any> = new EventEmitter();
  public resetPassword:boolean = false;
  public onReset:boolean = false;

  constructor(router: Router,private _loginService: LoginService) {
    this.router = router;
  }

  loginSubmit(){
      if (this.resetPassword && this.onReset == false){
          this._resetPassword();
      }
      else if(this.resetPassword && this.onReset){
          this._changePassword();
      }
      else{
          this._loginUser();
      }
  }


  _loginUser() {
    firebase.auth().signInWithEmailAndPassword(this.username,this.password).catch((error) => {this.message = error;}).then((user)=>{
          if (user){
          this.message = "Logged in, redirecting to ArtLike!";
          this.loginevent.next(firebase.auth().currentUser);
        }
      }
  );
}

  _changePassword(){
      this._loginService.changePassword(this.username,this.token,this.password).then((error)=>{
          if (error) {
            switch (error.code) {
              case "INVALID_PASSWORD":
                this.message = "The specified user token is incorrect.";
                break;
              case "INVALID_USER":
                this.message = "The specified user account does not exist.";
                break;
              default:
                this.message = "Error changing password:" +  error;
            }
          } else {
            this.message = "User password changed successfully, logging in!";
            this._loginUser();
          }

      });
  }

  resetPassForm(){
      this.resetPassword = true;
  }

  hasToken(){
      this.onReset = true;
  }

  _resetPassword() {
      this._loginService.resetPassword(this.username).then((error)=>{
          if (error) {
            this.message = error.code
            }
           else {
            this.message = `Password reset email sent successfully!
            Go to your email and follow instructions!`;
            this.onReset = true;
            this.resetPassword = false;
            }

      });
  }

  createUser(){
    this.router.navigate(['NewUser']);
    this.loginevent.next("newUser");
  }
}
