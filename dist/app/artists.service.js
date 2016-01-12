System.register(['./artist-information', 'angular2/core'], function(exports_1) {
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
                ArtistService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ArtistService);
                return ArtistService;
            })();
            exports_1("ArtistService", ArtistService);
        }
    }
});
//# sourceMappingURL=artists.service.js.map