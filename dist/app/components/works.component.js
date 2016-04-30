System.register(['angular2/core', '../../app/services/artists.service', 'angular2/router'], function(exports_1, context_1) {
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
    var WorkDisplay, AllWorksComponent;
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
            WorkDisplay = (function () {
                function WorkDisplay() {
                    this.showInfo = false;
                    this.size = '250px';
                }
                WorkDisplay.prototype.isHover = function () {
                    this.showInfo = true;
                    this.size = '275px';
                    console.log(this.opacity);
                };
                WorkDisplay.prototype.notHover = function () {
                    this.showInfo = false;
                    this.size = '250px';
                };
                __decorate([
                    core_1.Input('work-input'), 
                    __metadata('design:type', Object)
                ], WorkDisplay.prototype, "work", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], WorkDisplay.prototype, "opacity", void 0);
                WorkDisplay = __decorate([
                    core_1.Component({
                        selector: 'work-display',
                        template: "\n  <div (mouseenter)='isHover()' (mouseleave)='notHover()' style=\"height:350px\" class=\"col-lg-3 col-sm-6 text-center\">\n    <a  [routerLink]=\"['/Work', {id: work.artist_id + '@'+ work._id}]\">\n      <img style=\"max-height:{{size}}; opacity:{{opacity}}\" class=\"img-responsive center-block\" src=\"{{work.mainFile}}\" alt=\"{{work.name}}\">\n    </a>\n    <h4 *ngIf='showInfo'>{{work.name}}<small> {{work.artist_fname}} {{work.artist_lname}}</small></h4>\n    </div>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [])
                ], WorkDisplay);
                return WorkDisplay;
            }());
            exports_1("WorkDisplay", WorkDisplay);
            AllWorksComponent = (function () {
                function AllWorksComponent(_artistService) {
                    this._artistService = _artistService;
                    this.opacity = 1;
                }
                AllWorksComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._artistService.getSomeWorks(12).then(function (works) { return _this.works = works; });
                };
                AllWorksComponent.prototype.fetchNewWorks = function () {
                    var _this = this;
                    var interval = setInterval(function () {
                        _this.opacity = _this.opacity - .1;
                        if (_this.opacity < .1) {
                            clearInterval(interval);
                            _this._artistService.getSomeWorks(12).then(function (works) { return _this.works = works; }).then(function () {
                                _this.opacity = 1;
                            });
                        }
                    }, 20);
                };
                AllWorksComponent = __decorate([
                    core_1.Component({
                        selector: 'all-works',
                        templateUrl: './partials/all-works.html',
                        providers: [artists_service_1.ArtistService],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, WorkDisplay]
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