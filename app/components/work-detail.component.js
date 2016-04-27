System.register(['angular2/core', 'angular2/router', 'angular2/platform/common', '../../app/artists.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, artists_service_1, common_2;
    var WorkDetailComponent;
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
            function (common_2_1) {
                common_2 = common_2_1;
            }],
        execute: function() {
            WorkDetailComponent = (function () {
                function WorkDetailComponent(params, location, _artistService) {
                    this._artistService = _artistService;
                    this.firebaseUrl = "https://artlike.firebaseIO.com/users/";
                    this.location = location;
                }
                WorkDetailComponent.prototype.getWork = function (path1, path2) {
                    var _this = this;
                    var path = path1 + '/Works/' + path2;
                    var base = new Firebase(this.firebaseUrl + path);
                    base.once("value", function (data) {
                        _this.work = data.val();
                    });
                };
                WorkDetailComponent.prototype.getArtist = function () {
                    var _this = this;
                    var path = this.firebaseUrl + this.path1;
                    var base = new Firebase(path);
                    base.once("value", function (data) {
                        _this.artist = data.val();
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
                    this.path1 = path.split('@')[0];
                    this.path2 = path.split('@').slice(-1).pop();
                    this.getWork(this.path1, this.path2);
                    this.getArtist();
                };
                WorkDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'work-detail',
                        templateUrl: './partials/work.html',
                        inputs: ['work'],
                        providers: [artists_service_1.ArtistService],
                        directives: [router_1.RouterLink, common_2.NgStyle]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, common_1.Location, artists_service_1.ArtistService])
                ], WorkDetailComponent);
                return WorkDetailComponent;
            }());
            exports_1("WorkDetailComponent", WorkDetailComponent);
        }
    }
});
//# sourceMappingURL=work-detail.component.js.map