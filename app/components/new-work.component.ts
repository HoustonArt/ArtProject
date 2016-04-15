import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';
import {ViewChild, AfterViewInit} from "angular2/core";
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
      border-left: 5px solid #a94442;}
   `],
  directives: [ROUTER_DIRECTIVES, RouterLink],
})

export class NewWork implements AfterViewInit{
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
  public inputFile;
  public display = false;
  public showProgress = false;
  public img = new Image();
  numWorks: number;
  public progressNum: number;
  public uploadImage = new Image();
  public size: number;

  @ViewChild("imageCanvas") imageCanvas;
  @ViewChild("imageCanvas1") imageCanvas1;
  @ViewChild("imageCanvas2") imageCanvas2;
  @ViewChild("imageCanvas3") imageCanvas3;
  public canvas: any = [];
  public ctx: any = [];
  public imageHeight: number;
  public imageWidth: number;
  public angle: number = 0;

  ngAfterViewInit(){
    this.canvas = this.imageCanvas.nativeElement;
    this.ctx = this.canvas.getContext("2d");
  }

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
    });
  }


  authDataCallback(authData) {
    if (authData) {
      this.isLoggedIn = true;
      var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
      userBase.once("value", (data) => {
        this.user = data.val();
        this.work.artist_fname = this.user.firstName;
        this.work.artist_lname = this.user.lastName;
        this.work.artist_id = authData.uid;
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
      this.uploadImage.src = this.img.src;
    }
    reader.readAsDataURL(this.file);
    this.display = true;
    this.uploadImage.onload = () =>{
      this.imageWidth = this.uploadImage.width;
      this.imageHeight = this.uploadImage.height;
      while(this.imageWidth > 400 || this.imageHeight > 400){
        this.imageHeight = this.imageHeight *0.9;
        this.imageWidth = this.imageWidth *0.9;
      }
      this.size = Math.max(this.imageHeight, this.imageWidth);
      this.ctx.canvas.width = this.size;
      this.ctx.canvas.height = this.size;
      //rescale image so it fits in canvas
      this.ctx.drawImage(this.uploadImage,0,0,this.imageWidth, this.imageHeight);
    }
  }

  createNewWork() {
    if (this.numWorks < 15) {
      this.showProgress = true;
      this.uploadNewWork();
      this.numWorks = this.numWorks + 1;
    }
    else {
      this.message = "You have exceeded allowed number of works."
    }
  }

  resetWork() {
    this.showProgress = false;
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
    this.inputFile = '';
  }

  clearForm(){
    this.resetWork();
  }

  dataURItoBlob(dataURI:string): Blob {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
  }


  rotate(){
    //rotate an image
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    //translate to center of image
    this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
    this.angle = (this.angle +Math.PI/2) % (2*Math.PI);
    this.ctx.rotate(this.angle);
    this.ctx.drawImage(this.uploadImage,-this.imageWidth/2,-this.imageHeight/2, this.imageWidth, this.imageHeight);
    this.ctx.restore();
    this.getDataURL();
  }

//function to get dataurl from canvas
//Note that the dimension which is not dominant will be in the center
getDataURL() {
  var newCanvas = document.createElement('canvas');
  //check if right side up
  if (Math.abs(this.angle) < .1 || Math.abs(this.angle - Math.PI) < .1){
    newCanvas.width = this.imageWidth;
    newCanvas.height = this.imageHeight;
  }//else we are sideways
  else{
    newCanvas.width = this.imageHeight;
    newCanvas.height = this.imageWidth;
  }
  var newContext = newCanvas.getContext('2d');
  //check if right side up


  var dif = Math.max(this.size - this.imageWidth, this.size - this.imageHeight);
  newContext.drawImage(this.canvas, 0, 0, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);


  this.img.src = newCanvas.toDataURL(this.file.type);
  //this.img.src = this.canvas.toDataURL(this.file.type);
}



  uploadNewWork() {
    if (this.display) {
      if (this.file.size < 3000000){
        //first we will log it to Firebase, then to S3
        var fileBase = new Firebase(this.firebaseUrl + '/users/' + this.user.id);
        var newRef = fileBase.child("Works").push();
        var errRef = fileBase.child("Errors").push();
        this.work.mainFile = "https://s3.amazonaws.com/artlike/" + this.user.id + '/' + newRef.key();
        newRef.set(this.work);
        AWS.config.update({
          accessKeyId: this.access_id,
          secretAccessKey: this.access_key
        });
        AWS.config.region = 'us-east-1';
        //create new file since they are immutable
        var uploadFile = this.dataURItoBlob(this.canvas.toDataURL(this.file.type));
        var params = {
          Key: newRef.key(),
          ContentType: uploadFile.type,
          Body: uploadFile,
          ServerSideEncryption: 'AES256'
        };

        var AWSbucket = new AWS.S3({
          params: { Bucket: 'artlike/' + this.user.id }
        });

        AWSbucket.putObject(params, (err, data) => {
          if (err) {
            errRef.set(err);
            this.message = "there was an error" + err;
          }
          else {
            this.message = "upload complete!, Resetting form!";
            this.router.parent.navigate(['/User']);
          }
        }).on('httpUploadProgress', (progress)=>{
          this.progressNum = Math.round(progress.loaded/progress.total*100);
        });
      }
      else{
        alert("file size too large")
      }
    }
    else {
      alert("no file selected");
    }
  }
}
