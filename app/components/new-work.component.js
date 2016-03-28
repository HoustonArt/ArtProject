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
    var core_1, router_1, work_piece_1;
    var NewWork;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    this.work = new work_piece_1.WorkUpLoad('', '', '', '', '', [], '', [], '', '', '', 0);
                    this.message = '';
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.display = false;
                    this.img = new Image();
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
                NewWork.prototype.authDataCallback = function (authData) {
                    var _this = this;
                    if (authData) {
                        this.isLoggedIn = true;
                        var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
                        userBase.once("value", function (data) {
                            _this.user = data.val();
                            _this.work.artist_fname = _this.user.firstName;
                            _this.work.artist_lname = _this.user.lastName;
                            _this.work.arist_id = authData.uid;
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
                    };
                    reader.readAsDataURL(this.file);
                    this.display = true;
                };
                NewWork.prototype.createNewWork = function () {
                    if (this.numWorks < 15) {
                        this.uploadNewWork();
                        this.numWorks = this.numWorks + 1;
                    }
                    else {
                        this.message = "You have exceeded allowed number of works.";
                    }
                };
                NewWork.prototype.resetWork = function () {
                    this.router.parent.navigate(['/NewWork']);
                    /**
                    this.work.name = '';
                    this.work.media = '';
                    this.work.description = '';
                    this.work.price = '';
                    this.work.mainFile = '';
                    this.display = false;
                    this.file = undefined;*/
                };
                NewWork.prototype.uploadNewWork = function () {
                    var _this = this;
                    if (this.display) {
                        //first we will log it to Firebase, then to S3
                        var fileBase = new Firebase(this.firebaseUrl + '/users/' + this.user.id);
                        var newRef = fileBase.child("Works").push();
                        this.work.mainFile = "https://s3.amazonaws.com/artlike/" + newRef.key();
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
                        AWSbucket.putObject(params, function (err, data) {
                            if (err) {
                                console.log(err);
                                _this.message = "there was an error";
                            }
                            else {
                                _this.message = "upload complete!, Resetting form!";
                                _this.resetWork();
                            }
                        });
                    }
                    else {
                        alert("no file selected");
                    }
                };
                NewWork = __decorate([
                    core_1.Component({
                        selector: 'new-work',
                        templateUrl: './partials/new-work.html',
                        styles: ["\n    .ng-valid[required] {\n  border-left: 5px solid #42A948;\n    }\n\n.ng-invalid {\n  border-left: 5px solid #a94442;\n}"],
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