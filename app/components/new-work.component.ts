import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {User} from '../../app/user';
import {WorkUpLoad} from '../../app/work-piece';
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
  public work = new WorkUpLoad('', '', '', '', '', [], '', [], '', '', '', 0, '', '', '');
  public message = '';
  public password: string;
  firebaseUrl: string = "https://artlike.firebaseIO.com/";
  authData: any;
  isLoggedIn: boolean;
  public ref: any;
  bucket: string;
  access_key: string;
  access_id: string;
  public file: any;
  public display = false;
  public img = new Image();
  numWorks: number;

  constructor(router: Router) {
    this.router = router;
    this.ref = new Firebase(this.firebaseUrl);
    this.ref.onAuth((authdata) => {
      this.authDataCallback(authdata);
    });

    var credsBase = new Firebase(this.firebaseUrl + 'S3auth');
    credsBase.once("value", (data) => {
      var stuff = data.val();
      this.access_key = stuff.access_key;
      this.access_id = stuff.access_ID;
      this.bucket = stuff.bucket;
    })
  }


  authDataCallback(authData) {
    if (authData) {
      this.isLoggedIn = true;
      var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
      userBase.once("value", (data) => {
        this.user = data.val();
        this.work.artist_fname = this.user.firstName;
        this.work.artist_lname = this.user.lastName;
        this.work.arist_id = authData.uid;
        this.work.numFiles = 1;
        //get number of works
        this.numWorks = data.child('Works').numChildren();
      });
    } else {
      this.isLoggedIn = false;
    }
  }
  changeListener($event): void {
    this.file = $event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      this.img.src = reader.result;
    }
    reader.readAsDataURL(this.file);
    this.display = true;
  }
  createNewWork() {
    if (this.numWorks < 15) {
      this.uploadNewWork();
      this.numWorks = this.numWorks + 1;
    }
    else {
      this.message = "You have exceeded allowed number of works."
    }
  }

  resetWork() {
    this.work.name = '';
    this.work.media = '';
    this.work.description = '';
    this.work.price = '';
    this.work.mainFile = '';
    this.display = false;
    this.file = undefined;
    this.work.depth = '';
    this.work.width = '';
    this.work.length = '';
  }

  clearForm(){
    this.resetWork();
  }

  uploadNewWork() {

    if (this.display) {
      //first we will log it to Firebase, then to S3
      var fileBase = new Firebase(this.firebaseUrl + '/users/' + this.user.id);
      var newRef = fileBase.child("Works").push();
      this.work.mainFile = "https://s3.amazonaws.com/artlike/" + this.user.id + '/' + newRef.key();
      newRef.set(this.work);
      AWS.config.update({
        accessKeyId: this.access_id,
        secretAccessKey: this.access_key
      });
      AWS.config.region = 'us-east-1';

      var params = {
        Key: newRef.key(),
        ContentType: this.file.type,
        Body: this.file,
        ServerSideEncryption: 'AES256'
      };

      var AWSbucket = new AWS.S3({
        params: { Bucket: 'artlike/' + this.user.id }
      });

      AWSbucket.putObject(params, (err, data) => {
        if (err) {
          newRef.set(err);
          this.message = "there was an error" + err;
        }
        else {
          this.message = "upload complete!, Resetting form!";
          this.resetWork();
        }
      });
    }
    else {
      alert("no file selected");
    }
  }
}
