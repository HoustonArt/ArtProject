System.register(['angular2/core', '../../app/services/artists.service', '../../app/services/database.service', '../../app/services/login.service', '../../app/gallery', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, artists_service_1, database_service_1, login_service_1, gallery_1, router_1;
    var GalleryCreatorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            },
            function (gallery_1_1) {
                gallery_1 = gallery_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            GalleryCreatorComponent = (function () {
                function GalleryCreatorComponent(_artistService, router, _databaseService, _loginService) {
                    this._artistService = _artistService;
                    this._databaseService = _databaseService;
                    this._loginService = _loginService;
                    this._model = new gallery_1.Gallery('', '', '', '', '');
                    this.model = new gallery_1.GalleryContainer(this._model, []);
                    this.artheight = [200, 120, 340, 250, 500, 450];
                    this.containHeight = 340;
                    this.picHeight = 250;
                    this.router = router;
                }
                GalleryCreatorComponent.prototype.setHeights = function (size) {
                    if (size == 'sm') {
                        this.containHeight = 200;
                        this.picHeight = 120;
                    }
                    else if (size == 'lg') {
                        this.containHeight = 580;
                        this.picHeight = 500;
                    }
                    else {
                        this.containHeight = 300;
                        this.picHeight = 220;
                    }
                };
                GalleryCreatorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._artistService.getArtists().then(function (Artists) { return _this.Artists = Artists; });
                    this._artistService.getAllWorks().then(function (works) { return _this.works = works; }).then(function (works) { return _this.displayedWorks = _this.works; });
                    this._loginService.getUID().then(function (data) {
                        _this.user = data['uid'];
                        _this.model.info.user_id = _this.user;
                        _this.isLoggedIn = data['isLoggedIn'];
                    }).then(function () { _this.checkedLogin = true; });
                };
                //create link to page by adding firebase url
                GalleryCreatorComponent.prototype.createPage = function () {
                    if (this.user) {
                        this.createGallery();
                    }
                    else {
                        this.message = 'Sorry, you need to be logged in to create Galleries.  Make an account for free by clicking Login and then signing up!';
                    }
                };
                GalleryCreatorComponent.prototype.createGallery = function () {
                    var _this = this;
                    var path = 'users/' + this.user + '/Galleries';
                    this._databaseService.checkChildNumber(path).then(function (num) {
                        if (num < 5) {
                            _this._databaseService.pushToDatabase('Galleries', _this.model).then(function (ref) {
                                var _id = ref.key.split('/').pop();
                                _this.url = _id;
                                _this.full_url = 'artlike.io/#/gallery-view/' + _id;
                                _this.model.info.id = _id;
                                _this._databaseService.pushToDatabase(path, _this.model.info);
                            });
                        }
                        else {
                            _this.message = 'You have reached your allotment of Galleries';
                        }
                    });
                };
                //filter artists when selected by first and last name
                //should make this by id at some point.....
                GalleryCreatorComponent.prototype.filterArtists = function (artist) {
                    if (artist == 'All' || artist == null) {
                        this.displayedWorks = this.works;
                    }
                    else {
                        var fn = artist.split(",")[1].trim();
                        var ln = artist.split(",")[0].trim();
                        this.displayedWorks = this.works.filter(function (a) { return a.artist_fname == fn && a.artist_lname == ln; });
                    }
                };
                //remove work from gallery works if button is clicked
                GalleryCreatorComponent.prototype.removeWork = function (work) {
                    this.model.works = this.model.works.filter(function (a) { return a != work; });
                };
                //what to do if selected
                GalleryCreatorComponent.prototype.onSelect = function (work) {
                    this.model.works.push(work);
                };
                //setup preview modal
                GalleryCreatorComponent.prototype.previewPage = function () {
                    this.preview = 1;
                };
                //exit from preview
                GalleryCreatorComponent.prototype.exitPreview = function () {
                    this.preview = 0;
                };
                GalleryCreatorComponent = __decorate([
                    core_1.Component({
                        selector: 'gallery-creator',
                        templateUrl: './partials/gallery-creator.html',
                        styles: ["\n    .ng-valid[required] {\n  border-left: 5px solid #42A948;\n    }\n\n.ng-invalid {\n  border-left: 5px solid #a94442;\n}"],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [artists_service_1.ArtistService, database_service_1.DatabaseService, login_service_1.LoginService],
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, router_1.Router, database_service_1.DatabaseService, login_service_1.LoginService])
                ], GalleryCreatorComponent);
                return GalleryCreatorComponent;
            }());
            exports_1("GalleryCreatorComponent", GalleryCreatorComponent);
        }
    }
});
//# sourceMappingURL=gallery-creator.component.js.map