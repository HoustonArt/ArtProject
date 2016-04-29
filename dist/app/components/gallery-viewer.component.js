System.register(['angular2/core', '../../app/services/database.service', 'angular2/router', 'angular2/platform/common'], function(exports_1, context_1) {
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
    var core_1, database_service_1, router_1, common_1;
    var GalleryViewerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            GalleryViewerComponent = (function () {
                function GalleryViewerComponent(_databaseService, location) {
                    this._databaseService = _databaseService;
                    this.containHeight = 340;
                    this.picHeight = 250;
                    this.location = location;
                }
                GalleryViewerComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var path = this.location.path().split('/').pop();
                    this._databaseService.getObject('Galleries/' + path).then(function (data) {
                        _this.model = data;
                    });
                };
                GalleryViewerComponent = __decorate([
                    core_1.Component({
                        selector: 'gallery-viewer',
                        templateUrl: './partials/gallery-viewer.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [database_service_1.DatabaseService],
                    }), 
                    __metadata('design:paramtypes', [database_service_1.DatabaseService, common_1.Location])
                ], GalleryViewerComponent);
                return GalleryViewerComponent;
            }());
            exports_1("GalleryViewerComponent", GalleryViewerComponent);
        }
    }
});
//# sourceMappingURL=gallery-viewer.component.js.map