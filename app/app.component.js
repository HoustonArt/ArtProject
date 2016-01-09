System.register(['angular2/core', './artist-detail.component', './artists.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, artist_detail_component_1, artists_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (artist_detail_component_1_1) {
                artist_detail_component_1 = artist_detail_component_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_artistService) {
                    this._artistService = _artistService;
                    this.title = 'Houston Artists';
                }
                AppComponent.prototype.getArtists = function () {
                    var _this = this;
                    this._artistService.getArtists().then(function (artists) { return _this.artists = artists; });
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.getArtists();
                };
                AppComponent.prototype.onSelect = function (artist) { this.selectedArtist = artist; };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "\n    <h1>{{title}}</h1>\n    <h2>Meet the Artists</h2>\n    <ul class=\"artists\">\n      <li *ngFor=\"#artist of artists\"\n        [class.selected]= \"artist === selectedArtist\"\n        (click)=\"onSelect(artist)\">\n        <span class=\"badge\">{{artist.id}}</span> {{artist.lastName}}\n      </li>\n    </ul>\n    <artist-detail [artist] = \"selectedArtist\" ></artist-detail>\n  ",
                        styleUrls: ['./app/main.css'],
                        directives: [artist_detail_component_1.ArtistDetailComponent],
                        providers: [artists_service_1.ArtistService]
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map