System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, router_1;
    var FileUpload;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            FileUpload = (function () {
                function FileUpload(router) {
                    this.img = new Image();
                    this.uploadImage = new Image();
                    this.display = false;
                    this.message = "ArtLike is a community of artists and art lovers. We entrust you the user to sensor your own work. Please do not cross any lines.";
                    this.showProgress = false;
                    this.router = router;
                    var user = firebase.auth().currentUser;
                    if (user) {
                        this.isLoggedIn = true;
                        this.user = user;
                    }
                }
                FileUpload.prototype.ngAfterViewInit = function () {
                    this.canvas = this.imageCanvas.nativeElement;
                    this.ctx = this.canvas.getContext('2d');
                };
                FileUpload.prototype.changeListener = function ($event) {
                    var _this = this;
                    this.file = $event.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.img.src = reader.result;
                        _this.uploadImage.src = _this.img.src;
                    };
                    reader.readAsDataURL(this.file);
                    this.displayFile();
                };
                FileUpload.prototype.displayFile = function () {
                    var _this = this;
                    this.display = true;
                    this.uploadImage.onload = function () {
                        _this.imageWidth = _this.uploadImage.width;
                        _this.imageHeight = _this.uploadImage.height;
                        while (_this.imageWidth > 400 || _this.imageHeight > 400) {
                            _this.imageHeight = _this.imageHeight * 0.9;
                            _this.imageWidth = _this.imageWidth * 0.9;
                        }
                        _this.size = Math.max(_this.imageHeight, _this.imageWidth);
                        _this.ctx.canvas.width = _this.size;
                        _this.ctx.canvas.height = _this.size;
                        //rescale image so it fits in canvas
                        _this.ctx.drawImage(_this.uploadImage, 0, 0, _this.imageWidth, _this.imageHeight);
                    };
                };
                FileUpload.prototype.getDataURL = function () {
                    var newCanvas = document.createElement('canvas');
                    newCanvas.width = this.imageWidth;
                    newCanvas.height = this.imageHeight;
                    var newContext = newCanvas.getContext('2d');
                    var widthDif = this.canvas.width - newCanvas.width;
                    var heightDif = this.canvas.height - newCanvas.height;
                    newContext.drawImage(this.canvas, widthDif / 2, heightDif / 2, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);
                    return newCanvas.toDataURL();
                };
                FileUpload.prototype.dataURItoBlob = function (dataURI) {
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
                };
                FileUpload.prototype.uploadFile = function () {
                    var _this = this;
                    if (this.display) {
                        if (this.file.size < 3000000) {
                            this.showProgress = true;
                            var fileBase = firebase.database().ref().child('users').child(this.user.uid);
                            var storageRef = firebase.storage().ref().child(this.user.uid).child('ProfilePic');
                            //now upload file
                            var uploadTask = storageRef.put(this.dataURItoBlob(this.getDataURL()));
                            uploadTask.on('state_changed', function (snapshot) {
                                _this.progressNum = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            }, function (error) {
                                console.log(error);
                                // Handle unsuccessful uploads
                            }, function () {
                                // Handle successful uploads on complete
                                _this.showProgress = false;
                                var profURL = uploadTask.snapshot.downloadURL;
                                fileBase.update({ 'profilePic': profURL });
                                _this.message = 'File upload complete.  Press close to continue, and refresh page to see changes';
                                _this.showProgress = false;
                            });
                        }
                    }
                };
                __decorate([
                    core_2.ViewChild("imageCanvas"), 
                    __metadata('design:type', Object)
                ], FileUpload.prototype, "imageCanvas", void 0);
                FileUpload = __decorate([
                    core_1.Component({
                        selector: 'file-upload',
                        templateUrl: './partials/file-upload.html',
                        styles: ["\n    .ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n\n    .ng-invalid {\n      border-left: 5px solid #a94442;}\n   "],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], FileUpload);
                return FileUpload;
            }());
            exports_1("FileUpload", FileUpload);
        }
    }
});
//# sourceMappingURL=file-uploader.component.js.map