System.register(['angular2/core', '../../app/services/artists.service', '../../app/services/login.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, artists_service_1, login_service_1, router_1;
    var ArtSearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ArtSearchComponent = (function () {
                function ArtSearchComponent(_artistService, _loginService, router) {
                    var _this = this;
                    this._artistService = _artistService;
                    this._loginService = _loginService;
                    this.checkedLogin = false;
                    this.router = router;
                    this.ref = firebase.database().ref();
                    this._loginService.getUID().then(function (data) {
                        _this.user = data['uid'];
                        _this.isLoggedIn = data['isLoggedIn'];
                    }).then(function () { _this.checkedLogin = true; });
                }
                ArtSearchComponent.prototype.getWorks = function () {
                    var _this = this;
                    this._artistService.getSomeWorks(10).then(function (works) { return _this.works = works; });
                };
                ArtSearchComponent.prototype.ngOnInit = function () {
                    this.getWorks();
                    this.notStarted = true;
                };
                //create firebase database to hold stuff
                // if no user authentication, store as anonymous
                ArtSearchComponent.prototype.initGal = function () {
                    this.notStarted = false;
                    this.selectedIndex = 0;
                    this.selectedFile = this.works[0].mainFile;
                    this.newRef = this.ref.child('artSearch').push();
                    if (this.isLoggedIn) {
                        this.newRef.set({ "user": this.user,
                            "time": Date.now()
                        });
                    }
                    else {
                        this.newRef.set({ "user": "anonymous",
                            "time": Date.now()
                        });
                    }
                };
                ArtSearchComponent.prototype.hate = function () {
                    this.pushAnswer(0, this.works[this.selectedIndex]);
                    this.next();
                };
                ArtSearchComponent.prototype.meh = function () {
                    this.pushAnswer(1, this.works[this.selectedIndex]);
                    this.next();
                };
                ArtSearchComponent.prototype.okay = function () {
                    this.pushAnswer(2, this.works[this.selectedIndex]);
                    this.next();
                };
                ArtSearchComponent.prototype.love = function () {
                    this.pushAnswer(3, this.works[this.selectedIndex]);
                    this.next();
                };
                ArtSearchComponent.prototype.pushAnswer = function (val, work) {
                    this.newRef.push({ "workID": work._id,
                        "rating": val.toString(),
                        "artist": work.artist_id });
                };
                ArtSearchComponent.prototype.next = function () {
                    if (this.selectedIndex < 9) {
                        this.selectedIndex = this.selectedIndex + 1;
                    }
                    else {
                        this.router.parent.navigate(['/Works']);
                    }
                    this.selectedFile = this.works[this.selectedIndex].mainFile;
                };
                ArtSearchComponent = __decorate([
                    core_1.Component({
                        selector: 'art-search',
                        templateUrl: './partials/art-search.html',
                        providers: [artists_service_1.ArtistService, login_service_1.LoginService],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, login_service_1.LoginService, router_1.Router])
                ], ArtSearchComponent);
                return ArtSearchComponent;
            }());
            exports_1("ArtSearchComponent", ArtSearchComponent);
        }
    }
});
//# sourceMappingURL=art-search.component.js.map