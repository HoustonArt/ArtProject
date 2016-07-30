System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var LoginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LoginService = (function () {
                function LoginService() {
                    this.user = firebase.auth().currentUser;
                }
                LoginService.prototype.getLogin = function () {
                    //need to do later
                    var i = 2;
                };
                LoginService.prototype.getUID = function () {
                    return Promise.resolve(this.authDataCallBack(this.user));
                };
                LoginService.prototype.authDataCallBack = function (authData) {
                    if (authData) {
                        var isLoggedIn = true;
                        var uid = authData.uid;
                    }
                    else {
                        var isLoggedIn = false;
                        var uid = null;
                    }
                    return { isLoggedIn: isLoggedIn, uid: uid };
                };
                LoginService.prototype.resetPassword = function (email) {
                    return Promise.resolve(this.ref.resetPassword({ 'email': email }, function () { }).catch(function (err) {
                        return Promise.resolve(err);
                    }));
                };
                LoginService.prototype.changePassword = function (email, oldPassword, newPassword) {
                    return Promise.resolve(this.ref.changePassword({
                        'email': email,
                        'oldPassword': oldPassword,
                        'newPassword': newPassword
                    }, function () { }).catch(function (error) {
                        return Promise.resolve(error);
                    }));
                };
                LoginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LoginService);
                return LoginService;
            }());
            exports_1("LoginService", LoginService);
        }
    }
});
//# sourceMappingURL=login.service.js.map