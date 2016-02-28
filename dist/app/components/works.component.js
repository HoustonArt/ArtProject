System.register(['angular2/core', '../../app/artists.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, artists_service_1, router_1;
    var AllWorksComponent;
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
            AllWorksComponent = (function () {
                function AllWorksComponent(_artistService) {
                    this._artistService = _artistService;
                }
                AllWorksComponent.prototype.getWorks = function () {
                    var _this = this;
                    this._artistService.getAllWorks().then(function (works) { return _this.works = works; });
                };
                AllWorksComponent.prototype.ngOnInit = function () {
                    this.getWorks();
                };
                AllWorksComponent = __decorate([
                    core_1.Component({
                        selector: 'all-works',
                        templateUrl: './partials/all-works.html',
                        providers: [artists_service_1.ArtistService],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService])
                ], AllWorksComponent);
                return AllWorksComponent;
            }());
            exports_1("AllWorksComponent", AllWorksComponent);
        }
    }
});
//# sourceMappingURL=works.component.js.map