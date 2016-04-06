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
    var ArtistDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ArtistDetailComponent = (function () {
                function ArtistDetailComponent(params, location) {
                    this.firebaseUrl = "https://artlike.firebaseIO.com/users/";
                    this.works = [];
                    this.location = location;
                }
                ArtistDetailComponent.prototype.getArtist = function () {
                    var _this = this;
                    var path = this.firebaseUrl + this.path;
                    var base = new Firebase(path);
                    base.once("value", function (data) {
                        _this.artist = data.val();
                        var k = 0;
                        for (var i in _this.artist.Works) {
                            _this.works[k] = _this.artist.Works[i];
                            k = k + 1;
                        }
                    });
                };
                ArtistDetailComponent.prototype.ngOnInit = function () {
                    this.path = this.location.path().split('/').slice(-1).pop();
                    this.getArtist();
                };
                ArtistDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'artist-detail',
                        templateUrl: './partials/artist.html',
                        inputs: ['artist'],
                        providers: [],
                        directives: [router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Location])
                ], ArtistDetailComponent);
                return ArtistDetailComponent;
            }());
            exports_1("ArtistDetailComponent", ArtistDetailComponent);
        }
    }
});
//# sourceMappingURL=artist-detail.component.js.map