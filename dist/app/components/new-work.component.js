System.register(['angular2/core', 'angular2/router', '../../app/art-piece'], function(exports_1, context_1) {
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
    var core_1, router_1, art_piece_1;
    var NewWork;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (art_piece_1_1) {
                art_piece_1 = art_piece_1_1;
            }],
        execute: function() {
            NewWork = (function () {
                function NewWork(router) {
                    var _this = this;
                    this.work = new art_piece_1.Work('', '', '', '', '', [], '', [], '', '', '', 0);
                    this.message = '';
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.router = router;
                    this.ref = new Firebase(this.firebaseUrl);
                    this.ref.onAuth(function (authdata) {
                        _this.authDataCallback(authdata);
                    });
                }
                NewWork.prototype.authDataCallback = function (authData) {
                    var _this = this;
                    if (authData) {
                        this.isLoggedIn = true;
                        var userBase = new Firebase(this.firebaseUrl + 'users/' + authData.uid);
                        userBase.once("value", function (data) {
                            _this.user = data.val();
                        });
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                };
                NewWork.prototype.createNewWork = function () {
                    console.log(this.work);
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