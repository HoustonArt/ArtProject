import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
//import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';


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
  @Input() user: User = new User('', '', '', '', '', '', '','');
  @Input() _newUser: boolean = true;
  @Output() doneEvent: EventEmitter<any> = new EventEmitter();
  public email: string;
  public message = '';
  public password;
  firebaseUrl: string;
  authData: any;
  uploadFile: any;

  constructor(router: Router) {
    this.router = router;
    this.firebaseUrl = "https://artlike.firebaseIO.com/";
  }

updateUser(){
  if (this._newUser == true){
    this.createNewUser();
  }
  else{
    var ref = firebase.database().ref();
    var authData = firebase.auth().currentUser;
    if(authData){
      ref.child('users/' + authData.uid).set(this.user);
      this.doneEvent.next();
    }
    else{
        this.message = "authorization error";
      }
  }
}

handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
    }
  }

  createNewUser() {
    var ref = firebase.database().ref();
    firebase.auth().createUserWithEmailAndPassword(
      this.email,this.password).catch((error) => {
        this.message = error.message;
      }).then(()=>{
          var authData = firebase.auth().currentUser;
          if (authData){
            this.message = "Successfully created user account";
            //now login and set user data
            console.log("Authenticated successfully with payload:", authData);
            var userBase = ref.child('users/' + authData.uid);
            this.user.id = authData.uid;
            this.user.profilePic ="https://s3.amazonaws.com/artlike/assets/noperson.jpg";
            userBase.set(this.user);
            this.router.parent.navigate(['Home']);
        }});
      }
}
