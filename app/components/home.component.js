System.register(['angular2/core', '../../app/artists.service', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, artists_service_1, router_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_artistService, router) {
                    this._artistService = _artistService;
                    this.title = 'Houston Artists';
                    this.isLoggedIn = false;
                    this.router = router;
                }
                HomeComponent.prototype.getArtists = function () {
                    var _this = this;
                    this._artistService.getArtists().then(function (artists) { return _this.artists = artists; });
                };
                HomeComponent.prototype.ngOnInit = function () {
                    this.getArtists();
                };
                HomeComponent.prototype.onSelect = function (artist) {
                    this.router.parent.navigate(['/Artist', { id: artist.id }]);
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home',
                        templateUrl: './partials/homepage.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [artists_service_1.ArtistService],
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, router_1.Router])
                ], HomeComponent);
                return HomeComponent;
            })();
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map