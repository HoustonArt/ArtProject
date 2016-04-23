System.register(['angular2/core', 'angular2/router', '../../app/work-piece'], function(exports_1, context_1) {
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
    var core_1, router_1, core_2, work_piece_1;
    var NewWork;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (work_piece_1_1) {
                work_piece_1 = work_piece_1_1;
            }],
        execute: function() {
            NewWork = (function () {
                function NewWork(router) {
                    var _this = this;
                    this.work = new work_piece_1.WorkUpLoad('', '', '', '', '', [], '', [], '', '', '', 0, '', '', '');
                    this.message = '';
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.display = false;
                    this.showProgress = false;
                    this.img = new Image();
                    this.uploadImage = new Image();
                    this.canvas = [];
                    this.ctx = [];
                    this.angle = 0;
                    this.router = router;
                    this.ref = new Firebase(this.firebaseUrl);
                    this.ref.onAuth(function (authdata) {
                        _this.authDataCallback(authdata);
                    });
                    var credsBase = new Firebase(this.firebaseUrl + 'S3auth');
                    credsBase.once("value", function (data) {
                        var stuff = data.val();
                        _this.access_key = stuff.access_key;
                        _this.access_id = stuff.access_ID;
                        _this.bucket = stuff.bucket;
                    });
                }
                NewWork.prototype.ngAfterViewInit = function () {
                    this.canvas = this.imageCanvas.nativeElement;
                    this.ctx = this.canvas.getContext("2d");
                };
                NewWork.prototype.authDataCallback = function (authData) {
                    var _this = this;
                    if (authData) {
                        this.isLoggedIn = true;
                        var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
                        userBase.once("value", function (data) {
                            _this.user = data.val();
                            _this.work.artist_fname = _this.user.firstName;
                            _this.work.artist_lname = _this.user.lastName;
                            _this.work.artist_id = authData.uid;
                            _this.work.numFiles = 1;
                            //get number of works
                            _this.numWorks = data.child('Works').numChildren();
                        });
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                };
                NewWork.prototype.changeListener = function ($event) {
                    var _this = this;
                    this.file = $event.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.img.src = reader.result;
                        _this.uploadImage.src = _this.img.src;
                    };
                    reader.readAsDataURL(this.file);
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
                NewWork.prototype.createNewWork = function () {
                    if (this.numWorks < 15) {
                        this.showProgress = true;
                        this.uploadNewWork();
                        this.numWorks = this.numWorks + 1;
                    }
                    else {
                        this.message = "You have exceeded allowed number of works.";
                    }
                };
                NewWork.prototype.resetWork = function () {
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
                };
                NewWork.prototype.clearForm = function () {
                    this.resetWork();
                };
                NewWork.prototype.dataURItoBlob = function (dataURI) {
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
                NewWork.prototype.rotate = function () {
                    //rotate an image
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.save();
                    //translate to center of image
                    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
                    this.angle = (this.angle + Math.PI / 2) % (2 * Math.PI);
                    this.ctx.rotate(this.angle);
                    this.ctx.drawImage(this.uploadImage, -this.imageWidth / 2, -this.imageHeight / 2, this.imageWidth, this.imageHeight);
                    this.ctx.restore();
                };
                //function to get dataurl from canvas
                //Note that the dimension which is not dominant will be in the center
                NewWork.prototype.getDataURL = function () {
                    var newCanvas = document.createElement('canvas');
                    //check if right side up
                    if (Math.abs(this.angle) < .1 || Math.abs(this.angle - Math.PI) < .1) {
                        newCanvas.width = this.imageWidth;
                        newCanvas.height = this.imageHeight;
                    } //else we are sideways
                    else {
                        console.log('here');
                        newCanvas.width = this.imageHeight;
                        newCanvas.height = this.imageWidth;
                    }
                    var newContext = newCanvas.getContext('2d');
                    var widthDif = this.canvas.width - newCanvas.width;
                    var heightDif = this.canvas.height - newCanvas.height;
                    newContext.drawImage(this.canvas, widthDif / 2, heightDif / 2, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);
                    return newCanvas.toDataURL(this.file.type);
                };
                NewWork.prototype.uploadNewWork = function () {
                    var _this = this;
                    if (this.display) {
                        if (this.file.size < 3000000) {
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
                            this.getDataURL();
                            var uploadFile = this.dataURItoBlob(this.getDataURL());
                            var params = {
                                Key: newRef.key(),
                                ContentType: uploadFile.type,
                                Body: uploadFile,
                                ServerSideEncryption: 'AES256'
                            };
                            var AWSbucket = new AWS.S3({
                                params: { Bucket: 'artlike/' + this.user.id }
                            });
                            AWSbucket.putObject(params, function (err, data) {
                                if (err) {
                                    errRef.set(err);
                                    _this.message = "there was an error" + err;
                                }
                                else {
                                    _this.message = "upload complete!, Resetting form!";
                                    _this.router.parent.navigate(['/User']);
                                }
                            }).on('httpUploadProgress', function (progress) {
                                _this.progressNum = Math.round(progress.loaded / progress.total * 100);
                            });
                        }
                        else {
                            alert("file size too large");
                        }
                    }
                    else {
                        alert("no file selected");
                    }
                };
                __decorate([
                    core_2.ViewChild("imageCanvas"), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "imageCanvas", void 0);
                __decorate([
                    core_2.ViewChild("imageCanvas1"), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "imageCanvas1", void 0);
                __decorate([
                    core_2.ViewChild("imageCanvas2"), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "imageCanvas2", void 0);
                __decorate([
                    core_2.ViewChild("imageCanvas3"), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "imageCanvas3", void 0);
                NewWork = __decorate([
                    core_1.Component({
                        selector: 'new-work',
                        templateUrl: './partials/new-work.html',
                        styles: ["\n    .ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n\n    .ng-invalid {\n      border-left: 5px solid #a94442;}\n   "],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], NewWork);
                return NewWork;
            }());
            exports_1("NewWork", NewWork);
        }
    }
});
//# sourceMappingURL=new-work.component.js.map