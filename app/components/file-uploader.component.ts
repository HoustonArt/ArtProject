import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {ViewChild, AfterViewInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouterLink, Router} from 'angular2/router';

@Component({
  selector: 'file-upload',
  templateUrl: './partials/file-upload.html',
  styles: [`
    .ng-valid[required] {
    border-left: 5px solid #42A948;
      }

    .ng-invalid {
      border-left: 5px solid #a94442;}
   `],
  directives: [ROUTER_DIRECTIVES, RouterLink],
  providers: []
})
export class FileUpload implements AfterViewInit {
  public router: Router;
  @ViewChild("imageCanvas") imageCanvas;
  public canvas: any;
  public ctx: any;
  isLoggedIn: boolean;
  public user: any;
  public file: any;
  public img = new Image();
  public uploadImage = new Image();
  public size: number;
  public imageHeight: number;
  public imageWidth: number;
  public display = false;
  public progressNum: number;
  public message:string = "ArtLike is a community of artists and art lovers. We entrust you the user to sensor your own work. Please do not cross any lines.";
  public showProgress:boolean = false;




  ngAfterViewInit() {
    this.canvas = this.imageCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }

  constructor(router:Router) {
    this.router = router;
    var user = firebase.auth().currentUser;
    if (user) {
      this.isLoggedIn = true;
      this.user = user;
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
    this.displayFile();
  }

  displayFile() {
    this.display = true;
    this.uploadImage.onload = () => {
      this.imageWidth = this.uploadImage.width;
      this.imageHeight = this.uploadImage.height;
      while (this.imageWidth > 400 || this.imageHeight > 400) {
        this.imageHeight = this.imageHeight * 0.9;
        this.imageWidth = this.imageWidth * 0.9;
      }
      this.size = Math.max(this.imageHeight, this.imageWidth);
      this.ctx.canvas.width = this.size;
      this.ctx.canvas.height = this.size;
      //rescale image so it fits in canvas
      this.ctx.drawImage(this.uploadImage, 0, 0, this.imageWidth, this.imageHeight);
    }
  }
  getDataURL() {
    var newCanvas = document.createElement('canvas');

    newCanvas.width = this.imageWidth;
    newCanvas.height = this.imageHeight;
    var newContext = newCanvas.getContext('2d');
    var widthDif = this.canvas.width - newCanvas.width;
    var heightDif = this.canvas.height - newCanvas.height;

    newContext.drawImage(this.canvas, widthDif / 2, heightDif / 2, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);

    return newCanvas.toDataURL();
  }

  dataURItoBlob(dataURI: string): Blob {
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
    return new Blob([ia], { type: mimeString });
  }


  uploadFile() {
    if (this.display){
      if (this.file.size < 3000000) {
        this.showProgress = true;
        var fileBase = firebase.database().ref().child('users').child(this.user.uid);
        var storageRef = firebase.storage().ref().child(this.user.uid).child('ProfilePic');
        //now upload file
        var uploadTask = storageRef.put(this.dataURItoBlob(this.getDataURL()));
        uploadTask.on('state_changed', (snapshot)=> {
          this.progressNum = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }, (error) => {
          console.log(error);
            // Handle unsuccessful uploads
          }, ()=> {
            // Handle successful uploads on complete
            this.showProgress = false;
            var profURL = uploadTask.snapshot.downloadURL;
            fileBase.update({'profilePic':profURL});
            this.message = 'File upload complete.  Press close to continue, and refresh page to see changes';
            this.showProgress = false;

          });

      }
    }
  }

}
