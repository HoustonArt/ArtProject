System.register(['angular2/core', '../../app/artists.service', '../../app/gallery', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, artists_service_1, gallery_1, router_1;
    var GalleryCreatorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (gallery_1_1) {
                gallery_1 = gallery_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            GalleryCreatorComponent = (function () {
                function GalleryCreatorComponent(_artistService, router) {
                    this._artistService = _artistService;
                    this.galleryWorks = [];
                    this.model = new gallery_1.Gallery(2, '', '', '');
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
                GalleryCreatorComponent.prototype.getWorks = function () {
                    var _this = this;
                    this._artistService.getAllWorks().then(function (works) { return _this.works = works; }).then(function (works) { return _this.displayedWorks = works; });
                };
                GalleryCreatorComponent.prototype.getArtists = function () {
                    var _this = this;
                    this._artistService.getArtists().then(function (Artists) { return _this.Artists = Artists; });
                };
                GalleryCreatorComponent.prototype.ngOnInit = function () {
                    this.getWorks();
                    this.getArtists();
                };
                //create link to page by adding firebase url 
                GalleryCreatorComponent.prototype.createPage = function () {
                    var url = this.model.stringify();
                    url = url + "@" + this.containHeight + "@" + this.picHeight;
                    for (var i = 0; i < this.galleryWorks.length; i++) {
                        url = url + "@" + this.galleryWorks[i]['_id'].replace(/\s/g, "%");
                    }
                    this.url = url;
                    this.full_url = 'houstonart.github.io/#/gallery-view/' + url;
                };
                //filter artists when selected by first and last name
                //should make this by id at some point.....
                GalleryCreatorComponent.prototype.filterArtists = function (artist) {
                    if (artist == 'All') {
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
                    this.galleryWorks = this.galleryWorks.filter(function (a) { return a != work; });
                };
                //what to do if selected
                GalleryCreatorComponent.prototype.onSelect = function (work) {
                    this.galleryWorks.push(work);
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
                        providers: [artists_service_1.ArtistService],
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, router_1.Router])
                ], GalleryCreatorComponent);
                return GalleryCreatorComponent;
            }());
            exports_1("GalleryCreatorComponent", GalleryCreatorComponent);
        }
    }
});
//# sourceMappingURL=gallery-creator.component.js.map