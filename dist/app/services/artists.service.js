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
    //needs to modify answer
    function get_elements(id_list, arr, _ans) {
        for (var i = 0; i < id_list.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (id_list[i] == arr[j]._id) {
                    _ans.push(arr[j]);
                    break;
                }
            }
        }
        return _ans;
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
                    this._Works = [];
                    this.base = firebase.database().ref().child('users');
                }
                ArtistService.prototype.getAllWorks = function () {
                    var _this = this;
                    var workArr = [];
                    return this.base.once("value", function (snapShot) {
                        snapShot.forEach(function (snapShotChild) {
                            if (snapShotChild.hasChild('Works')) {
                                snapShotChild.child('Works').forEach(function (work) {
                                    _this.work = work.val();
                                    _this.work['_id'] = work.key;
                                    workArr.push(_this.work);
                                });
                            }
                        });
                    }).then(function () {
                        return Promise.resolve(shuffle(workArr));
                    });
                };
                ArtistService.prototype.getSomeWorks = function (num) {
                    return this.getAllWorks().then(function (works) {
                        return Promise.resolve(works.slice(0, num));
                    });
                };
                ArtistService.prototype.getArtists = function () {
                    var _this = this;
                    return this.base.once("value", function (snapShot) {
                        snapShot.forEach(function (snapShotChild) {
                            if (snapShotChild.hasChild('Works') || snapShotChild.hasChild('Galleries')) {
                                _this.ARTISTS.push(snapShotChild.val());
                            }
                        });
                    }).then(function () {
                        return Promise.resolve(shuffle(_this.ARTISTS));
                    });
                };
                ArtistService.prototype.getWorkList = function (work_id) {
                    return this.getAllWorks().then(function (works) {
                        return Promise.resolve(get_elements(work_id, works, []));
                    });
                };
                ArtistService.prototype.getMaxNumGalleries = function (uid) {
                    var numGals = 15;
                    return Promise.resolve(numGals);
                };
                ArtistService.prototype.getMaxNumWorks = function (uid) {
                    var numWorks = 15;
                    return Promise.resolve(numWorks);
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