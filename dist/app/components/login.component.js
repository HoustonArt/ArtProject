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
    var core_1, router_1;
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(router) {
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.message = "";
                    this.loginevent = new core_1.EventEmitter();
                    this.router = router;
                }
                Login.prototype.loginUser = function () {
                    var _this = this;
                    var ref = new Firebase(this.firebaseUrl);
                    ref.authWithPassword({
                        "email": this.username,
                        "password": this.password
                    }, function (error, authData) {
                        if (error) {
                            _this.message = error;
                        }
                        else {
                            _this.message = "Logged in, redirecting to ArtLike!";
                            _this.loginevent.next(authData);
                        }
                    });
                };
                Login.prototype.createUser = function () {
                    this.router.navigate(['NewUser']);
                    this.loginevent.next("newUser");
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], Login.prototype, "loginevent", void 0);
                Login = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: './partials/login.html',
                        styles: ["\n    .ng-valid[required] {\n  border-left: 5px solid #42A948;\n    }\n\n.ng-invalid {\n  border-left: 5px solid #a94442;\n}\n\n @media screen and (max-width: 400px) {\n   .loginrow {\n       padding-top:75px;\n   }\n   \n}\n"],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.component.js.map