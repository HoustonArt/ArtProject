System.register(['angular2/core', '../../app/artists.service', '../../app/gallery', 'angular2/router'], function(exports_1) {
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
    var GalleryViewerComponent;
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
            GalleryViewerComponent = (function () {
                function GalleryViewerComponent(_artistService, location) {
                    this._artistService = _artistService;
                    this.containHeight = 340;
                    this.picHeight = 250;
                    this.galleryWorks = [];
                    this.loading = 1;
                    this.location = location;
                }
                GalleryViewerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var path = this.location.path();
                    path = path.slice(14, path.length);
                    path = path.replace(/%/g, ' ');
                    var info = path.split('@');
                    this.model = new gallery_1.Gallery(2, info[0], info[1], '');
                    this.containHeight = parseInt(info[2]);
                    this.picHeight = parseInt(info[3]);
                    var pics = info.slice(4, info.length);
                    for (var i = 0; i < pics.length; i++) {
                        this._artistService.getOneWork(pics[i]).then(function (works) { return _this.galleryWorks.push(works); });
                    }
                    this.loading = 0;
                };
                GalleryViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'gallery-viewer',
                        templateUrl: './partials/gallery-viewer.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [artists_service_1.ArtistService],
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, router_1.Location])
                ], GalleryViewerComponent);
                return GalleryViewerComponent;
            })();
            exports_1("GalleryViewerComponent", GalleryViewerComponent);
        }
    }
});
//# sourceMappingURL=gallery-viewer.component.js.map