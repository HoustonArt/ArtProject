System.register(['angular2/core', 'angular2/router', '../../app/user'], function(exports_1, context_1) {
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
    var core_1, router_1, user_1;
    var NewUser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            //import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';
            NewUser = (function () {
                function NewUser(router) {
                    this.user = new user_1.User('', '', '', '', '', '', '', '');
                    this._newUser = true;
                    this.doneEvent = new core_1.EventEmitter();
                    this.message = '';
                    this.router = router;
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                }
                NewUser.prototype.updateUser = function () {
                    if (this._newUser == true) {
                        this.createNewUser();
                    }
                    else {
                        var ref = firebase.database().ref();
                        var authData = firebase.auth().currentUser;
                        if (authData) {
                            ref.child('users/' + authData.uid).set(this.user);
                            this.doneEvent.next();
                        }
                        else {
                            this.message = "authorization error";
                        }
                    }
                };
                NewUser.prototype.handleUpload = function (data) {
                    if (data && data.response) {
                        data = JSON.parse(data.response);
                        this.uploadFile = data;
                    }
                };
                NewUser.prototype.createNewUser = function () {
                    var _this = this;
                    var ref = firebase.database().ref();
                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function (error) {
                        _this.message = error.message;
                    }).then(function () {
                        var authData = firebase.auth().currentUser;
                        if (authData) {
                            _this.message = "Successfully created user account";
                            //now login and set user data
                            var userBase = ref.child('users/' + authData.uid);
                            _this.user.id = authData.uid;
                            _this.user.profilePic = "https://s3.amazonaws.com/artlike/assets/noperson.jpg";
                            userBase.set(_this.user);
                            _this.router.parent.navigate(['Home']);
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', user_1.User)
                ], NewUser.prototype, "user", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], NewUser.prototype, "_newUser", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], NewUser.prototype, "doneEvent", void 0);
                NewUser = __decorate([
                    core_1.Component({
                        selector: 'new-user',
                        templateUrl: './partials/new-user.html',
                        styles: ["\n    .ng-valid[required] {\n  border-left: 5px solid #42A948;\n    }\n\n.ng-invalid {\n  border-left: 5px solid #a94442;\n}"],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], NewUser);
                return NewUser;
            }());
            exports_1("NewUser", NewUser);
        }
    }
});
//# sourceMappingURL=new-user.component.js.map