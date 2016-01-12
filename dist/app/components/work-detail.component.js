System.register(['angular2/core', 'angular2/router', '../../app/artists.service', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, artists_service_1, common_1;
    var WorkDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (artists_service_1_1) {
                artists_service_1 = artists_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            WorkDetailComponent = (function () {
                function WorkDetailComponent(params, location, _artistService) {
                    this._artistService = _artistService;
                    this.location = location;
                }
                WorkDetailComponent.prototype.getWork = function () {
                    var _this = this;
                    this._artistService.getWork(this.path1, this.path2).then(function (work) { return _this.work = work; });
                };
                WorkDetailComponent.prototype.getArtist = function () {
                    var _this = this;
                    this._artistService.getArtist(this.path1).then(function (artist) { return _this.artist = artist; });
                };
                WorkDetailComponent.prototype.ngOnInit = function () {
                    var path = this.location.path().split('/').slice(-1).pop();
                    this.path1 = path.split('-')[0];
                    this.path2 = path.split('-').slice(-1).pop();
                    this.getWork();
                    this.getArtist();
                };
                WorkDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'work-detail',
                        templateUrl: './partials/work.html',
                        inputs: ['work'],
                        providers: [artists_service_1.ArtistService],
                        directives: [router_1.RouterLink, common_1.NgStyle]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, router_1.Location, artists_service_1.ArtistService])
                ], WorkDetailComponent);
                return WorkDetailComponent;
            })();
            exports_1("WorkDetailComponent", WorkDetailComponent);
        }
    }
});
//# sourceMappingURL=work-detail.component.js.map