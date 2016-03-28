System.register(['./artist-information', 'angular2/core'], function(exports_1, context_1) {
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
    var artist_information_1, core_1;
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
            function (artist_information_1_1) {
                artist_information_1 = artist_information_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ArtistService = (function () {
                function ArtistService() {
                }
                ArtistService.prototype.getArtists = function () {
                    return Promise.resolve(artist_information_1.ARTISTS);
                };
                ArtistService.prototype.getArtist = function (id) {
                    for (var i = 0; i < artist_information_1.ARTISTS.length; i++) {
                        if (artist_information_1.ARTISTS[i]['id'] == id) {
                            this.artist = artist_information_1.ARTISTS[i];
                            break;
                        }
                    }
                    return Promise.resolve(this.artist);
                };
                ArtistService.prototype.getOneWork = function (id) {
                    for (var i = 0; i < artist_information_1.ARTISTS.length; i++) {
                        var numWorks = parseInt(artist_information_1.ARTISTS[i].numWorks);
                        for (var j = 0; j < numWorks; j++) {
                            if (artist_information_1.ARTISTS[i].works[j]['_id'] == id) {
                                return Promise.resolve(artist_information_1.ARTISTS[i].works[j]);
                            }
                        }
                    }
                };
                ArtistService.prototype.getWork = function (aid, wid) {
                    for (var i = 0; i < artist_information_1.ARTISTS.length; i++) {
                        if (artist_information_1.ARTISTS[i]['id'] == aid) {
                            this.artist = artist_information_1.ARTISTS[i];
                            break;
                        }
                    }
                    var numWorks = parseInt(this.artist.numWorks);
                    for (var j = 0; j < numWorks; j++) {
                        if (this.artist.works[j]['name'] == wid) {
                            this.work = this.artist.works[j];
                            break;
                        }
                    }
                    return Promise.resolve(this.work);
                };
                ArtistService.prototype.getAllWorks = function () {
                    var WORKS = [];
                    for (var i = 0; i < artist_information_1.ARTISTS.length; i++) {
                        for (var j = 0; j < parseInt(artist_information_1.ARTISTS[i]['numWorks']); j++) {
                            WORKS.push(artist_information_1.ARTISTS[i]['works'][j]);
                        }
                    }
                    //
                    return Promise.resolve(shuffle(WORKS));
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