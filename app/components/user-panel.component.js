System.register(['angular2/core', 'angular2/router', './new-work.component'], function(exports_1, context_1) {
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
    var core_1, router_1, new_work_component_1;
    var UserPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (new_work_component_1_1) {
                new_work_component_1 = new_work_component_1_1;
            }],
        execute: function() {
            UserPanelComponent = (function () {
                function UserPanelComponent() {
                    var _this = this;
                    this.works = [];
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.isLoggedIn = false;
                    this.noEdit = true;
                    this.base = new Firebase(this.firebaseUrl);
                    this.base.onAuth(function (authdata) {
                        _this.authDataCallback(authdata);
                    });
                }
                UserPanelComponent.prototype.authDataCallback = function (authData) {
                    var _this = this;
                    if (authData) {
                        this.isLoggedIn = true;
                        this.userPath = 'users/' + authData.uid;
                        this.base.child(this.userPath).once("value", function (data) {
                            _this.user = data.val();
                        });
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                };
                //get the artist information and build array of works from
                //the firebase
                UserPanelComponent.prototype.getArtist = function () {
                    var _this = this;
                    this.base.child(this.userPath).once("value", function (data) {
                        _this.artist = data.val();
                        _this.numWorks = 0;
                        for (var i in _this.artist.Works) {
                            _this.works[_this.numWorks] = _this.artist.Works[i];
                            _this.numWorks = _this.numWorks + 1;
                        }
                    });
                };
                //get the artist when the app loads
                UserPanelComponent.prototype.ngOnInit = function () {
                    this.getArtist();
                };
                //check if the work array is built yet so we don't
                //try to render things which are not yet here
                //it will hide the works if this function returns true
                UserPanelComponent.prototype.workLengthCheck = function () {
                    if (this.numWorks > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                };
                // Function to set up editing template
                UserPanelComponent.prototype.edit = function (picture) {
                    var _this = this;
                    var pic_id = picture['src'].split('/').pop(-1);
                    this.noEdit = false;
                    this.base.child(this.userPath).child('Works').child(pic_id).once("value", function (data) {
                        _this.work = data.val();
                    });
                };
                UserPanelComponent = __decorate([
                    core_1.Component({
                        selector: 'user-panel',
                        templateUrl: './partials/user-panel.html',
                        styles: ["\n    .ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n\n    .ng-invalid {\n      border-left: 5px solid #a94442;\n    }\n      "],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, new_work_component_1.NewWork],
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserPanelComponent);
                return UserPanelComponent;
            }());
            exports_1("UserPanelComponent", UserPanelComponent);
        }
    }
});
//# sourceMappingURL=user-panel.component.js.map