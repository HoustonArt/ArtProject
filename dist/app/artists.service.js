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
    var ArtistService;
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ArtistService = (function () {
                function ArtistService() {
                    this.ARTISTS = [];
                    this.WORKS = [];
                    //private ARTISTS: Artist[];
                    this.firebaseUrl = "https://artlike.firebaseIO.com/users/";
                }
                ArtistService.prototype.fromFirebase = function () {
                    var _this = this;
                    this.WORKS = [];
                    this.ARTISTS = [];
                    var base = new Firebase(this.firebaseUrl);
                    base.once("value", function (snapShot) {
                        snapShot.forEach(function (snapShotChild) {
                            if (snapShotChild.hasChild('Works')) {
                                _this.ARTISTS.push(snapShotChild.val());
                                snapShotChild.child('Works').forEach(function (work) {
                                    _this.work = work.val();
                                    _this.work['_id'] = work.key();
                                    _this.WORKS.push(_this.work);
                                });
                            }
                        });
                    });
                };
                ArtistService.prototype.getArtists = function () {
                    this.fromFirebase();
                    return Promise.resolve(this.ARTISTS);
                };
                ArtistService.prototype.getAllWorks = function () {
                    this.fromFirebase();
                    return Promise.resolve(shuffle(this.WORKS));
                };
                ArtistService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ArtistService);
                return ArtistService;
            }());
            exports_1("ArtistService", ArtistService);
        }
    }
});
//# sourceMappingURL=artists.service.js.map