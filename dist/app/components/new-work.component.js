System.register(['angular2/core', 'angular2/router', '../../app/user', '../../app/work-piece', '../../app/services/artists.service'], function(exports_1, context_1) {
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
    var core_1, router_1, core_2, user_1, work_piece_1, artists_service_1;
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
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (work_piece_1_1) {
                work_piece_1 = work_piece_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            }],
        execute: function() {
            NewWork = (function () {
                function NewWork(router, _artistService) {
                    var _this = this;
                    this._artistService = _artistService;
                    this.work = new work_piece_1.WorkUpLoad('', '', '', '', '', [], '', [], '', '', '', 0, '', '', '');
                    this._newWork = true;
                    this.doneEvent = new core_1.EventEmitter();
                    this.message = '';
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.display = false;
                    this.showProgress = false;
                    this.img = new Image();
                    this.uploadImage = new Image();
                    this.canvas = [];
                    this.ctx = [];
                    this.angle = 0;
                    this.oldWork = false;
                    this.router = router;
                    var user = firebase.auth().currentUser;
                    if (user) {
                        this.isLoggedIn = true;
                        this.user = user;
                        this._artistService.getMaxNumWorks(this.user).then(function (ret) {
                            _this.maxNumWorks = ret;
                        });
                        var userBase = firebase.database().ref().child('users').child(user.uid);
                        userBase.once("value", function (data) {
                            _this.user = data.val();
                            _this.work.artist_fname = _this.user.firstName;
                            _this.work.artist_lname = _this.user.lastName;
                            _this.work.artist_id = user.uid;
                            _this.work.numFiles = 1;
                            //get number of works
                            _this.numWorks = data.child('Works').numChildren();
                        });
                    }
                }
                NewWork.prototype.ngAfterViewInit = function () {
                    if (this.isLoggedIn) {
                        this.canvas = this.imageCanvas.nativeElement;
                        this.ctx = this.canvas.getContext("2d");
                    }
                };
                NewWork.prototype.ngOnInit = function () {
                    if (!this._newWork) {
                        this.oldWork = true;
                        this.file = this.work.mainFile;
                        this.img.src = this.work.mainFile;
                        //so we can edit this bad boy
                        this.uploadImage.crossOrigin = 'anonymous';
                        this.uploadImage.src = this.work.mainFile + '?crossorigin';
                        this.displayFile();
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
                    this.displayFile();
                };
                NewWork.prototype.displayFile = function () {
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
                NewWork.prototype.createNewWork = function () {
                    if (this.numWorks < this.maxNumWorks) {
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
                        newCanvas.width = this.imageHeight;
                        newCanvas.height = this.imageWidth;
                    }
                    var newContext = newCanvas.getContext('2d');
                    var widthDif = this.canvas.width - newCanvas.width;
                    var heightDif = this.canvas.height - newCanvas.height;
                    newContext.drawImage(this.canvas, widthDif / 2, heightDif / 2, newCanvas.width, newCanvas.height, 0, 0, newCanvas.width, newCanvas.height);
                    return newCanvas.toDataURL();
                };
                NewWork.prototype.uploadNewWork = function () {
                    var _this = this;
                    if (this.display) {
                        if (this.file.size < 3000000 || this.work.mainFile != '') {
                            for (var i = 0; i < 4; i++) {
                                this.rotate();
                            }
                            //first we will log it to Firebase, then to the storage
                            //if work already there, will have a mainFile
                            if (!this._newWork) {
                                var fileBase = firebase.database().ref().child('users').child(this.user.id);
                                fileBase.child('Works').child(this.work._id).set(this.work);
                                var uploadFile = this.dataURItoBlob(this.getDataURL());
                            }
                            else {
                                var fileBase = firebase.database().ref().child('users').child(this.user.id);
                                var newRef = fileBase.child("Works").push();
                                var errRef = fileBase.child("Errors").push();
                                newRef.set(this.work);
                                var uploadFile = this.dataURItoBlob(this.getDataURL());
                            }
                            var storage = firebase.storage();
                            // Create a storage reference from our storage service
                            var storageRef = storage.ref().child(this.user.id);
                            var uploadTask = storageRef.child(newRef.key).put(uploadFile);
                            uploadTask.on('state_changed', function (snapshot) {
                                _this.progressNum = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            }, function (error) {
                                console.log(error);
                                // Handle unsuccessful uploads
                            }, function () {
                                // Handle successful uploads on complete
                                _this.work.mainFile = uploadTask.snapshot.downloadURL;
                                newRef.set(_this.work);
                                _this.router.parent.navigate(['/User']);
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
                    core_1.Input(), 
                    __metadata('design:type', user_1.User)
                ], NewWork.prototype, "user", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "work", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], NewWork.prototype, "_newWork", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NewWork.prototype, "doneEvent", void 0);
                __decorate([
                    core_2.ViewChild("imageCanvas"), 
                    __metadata('design:type', Object)
                ], NewWork.prototype, "imageCanvas", void 0);
                NewWork = __decorate([
                    core_1.Component({
                        selector: 'new-work',
                        templateUrl: './partials/new-work.html',
                        styles: ["\n    .ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n\n    .ng-invalid {\n      border-left: 5px solid #a94442;}\n   "],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [artists_service_1.ArtistService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, artists_service_1.ArtistService])
                ], NewWork);
                return NewWork;
            }());
            exports_1("NewWork", NewWork);
        }
    }
});
//# sourceMappingURL=new-work.component.js.map