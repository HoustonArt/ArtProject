System.register(['angular2/core', 'angular2/router', 'angular2/platform/common', '../../app/services/artists.service', '../../app/services/database.service', 'angular2/common', '../../app/services/login.service', './messages.component'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, artists_service_1, database_service_1, common_2, login_service_1, messages_component_1;
    var WorkDetailComponent;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (common_2_1) {
                common_2 = common_2_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            }],
        execute: function() {
            WorkDetailComponent = (function () {
                function WorkDetailComponent(params, location, router, _artistService, _loginService, _databaseService) {
                    var _this = this;
                    this._artistService = _artistService;
                    this._loginService = _loginService;
                    this._databaseService = _databaseService;
                    this.ownsWork = false;
                    this.router = router;
                    this.location = location;
                    this._loginService.getUID().then(function (snap) {
                        _this.isLoggedIn = snap['isLoggedIn'];
                        _this.uid = snap['uid'];
                    });
                }
                WorkDetailComponent.prototype.deleteWork = function () {
                    var _this = this;
                    var path = this.location.path().split('/').slice(-1).pop();
                    var path1 = path.split('@')[0];
                    var path2 = path.split('@').slice(-1).pop();
                    if (this.uid == this.work.artist_id) {
                        this._databaseService.removeObject('users/' + path1 + '/Works/' + path2).then(function (error) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                _this.router.parent.navigate(['/Artist', { id: _this.artist.id }]);
                            }
                        });
                    }
                };
                WorkDetailComponent.prototype.getInformation = function (path1, path2) {
                    var _this = this;
                    var path = 'users/' + path1;
                    this._databaseService.getObject(path).then(function (data) {
                        _this.artist = data;
                        _this.work = data['Works'][path2];
                        _this.otherWorks = [];
                        for (var i in data['Works']) {
                            if (i != path2) {
                                data['Works'][i]['_id'] = i;
                                _this.otherWorks.push(data['Works'][i]);
                            }
                        }
                        // select four other works, or less if possible
                        _this.otherWorks = shuffle(_this.otherWorks);
                        if (_this.otherWorks.length > 4) {
                            _this.otherWorks = _this.otherWorks.slice(0, 4);
                        }
                        if (_this.uid == data['id']) {
                            _this.ownsWork = true;
                        }
                    });
                };
                WorkDetailComponent.prototype.initGal = function () {
                    this.selectedIndex = 0;
                    this.selectedFile = this.work.files[0];
                };
                WorkDetailComponent.prototype.previous = function () {
                    if (this.selectedIndex > 0) {
                        this.selectedIndex = this.selectedIndex - 1;
                    }
                    else {
                        this.selectedIndex = this.work.numFiles - 1;
                    }
                    this.selectedFile = this.work.files[this.selectedIndex];
                };
                WorkDetailComponent.prototype.next = function () {
                    if (this.selectedIndex < this.work.numFiles - 1) {
                        this.selectedIndex = this.selectedIndex + 1;
                    }
                    else {
                        this.selectedIndex = 0;
                    }
                    this.selectedFile = this.work.files[this.selectedIndex];
                };
                WorkDetailComponent.prototype.ngOnInit = function () {
                    var path = this.location.path().split('/').slice(-1).pop();
                    var path1 = path.split('@')[0];
                    var path2 = path.split('@').slice(-1).pop();
                    //this.getWork(path1, path2);
                    this.getInformation(path1, path2);
                };
                WorkDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'work-detail',
                        templateUrl: './partials/work.html',
                        inputs: ['work'],
                        providers: [artists_service_1.ArtistService, login_service_1.LoginService, database_service_1.DatabaseService],
                        directives: [router_1.RouterLink, common_2.NgStyle, messages_component_1.MessageWriter, router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, common_1.Location, router_1.Router, artists_service_1.ArtistService, login_service_1.LoginService, database_service_1.DatabaseService])
                ], WorkDetailComponent);
                return WorkDetailComponent;
            }());
            exports_1("WorkDetailComponent", WorkDetailComponent);
        }
    }
});
//# sourceMappingURL=work-detail.component.js.map