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
            NewUser = (function () {
                function NewUser(router) {
                    this.user = new user_1.User('', '', '', '', '', '', '', '');
                    this.message = '';
                    this.router = router;
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                }
                NewUser.prototype.createNewUser = function () {
                    var _this = this;
                    var ref = new Firebase(this.firebaseUrl);
                    ref.createUser({
                        email: this.user.email,
                        password: this.password
                    }, function (error, userData) {
                        if (error) {
                            switch (error.code) {
                                case "EMAIL_TAKEN":
                                    _this.message = "The new user account cannot be created because the email is already in use.";
                                    break;
                                case "INVALID_EMAIL":
                                    _this.message = "The specified email is not a valid email.";
                                    break;
                                default:
                                    console.log("Error creating user:", error);
                            }
                        }
                        else {
                            _this.message = "Successfully created user account";
                            //now login and set user data
                            ref.authWithPassword({
                                email: _this.user.email,
                                password: _this.password
                            }, function (error, authData) {
                                if (error) {
                                    console.log("Login Failed!", error);
                                }
                                else {
                                    console.log("Authenticated successfully with payload:", authData);
                                    var userBase = new Firebase(_this.firebaseUrl + 'users/' + authData.uid);
                                    _this.user.id = authData.uid;
                                    userBase.set(_this.user);
                                }
                            });
                        }
                    });
                    ref.unauth();
                    this.router.parent.navigate(['Home']);
                };
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