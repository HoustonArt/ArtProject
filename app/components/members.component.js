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
    var MembersComponent;
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
            MembersComponent = (function () {
                function MembersComponent(_artistService, _router) {
                    this._artistService = _artistService;
                    this._router = _router;
                }
                //get all the artists and group into group of 4
                MembersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._artistService.getMembers().then(function (artists) {
                        var artists_list = [];
                        for (var i in artists) {
                            var j = parseInt(i);
                            if (j % 4 === 0) {
                                artists_list.push(artists.slice(j, j + 4));
                            }
                        }
                        _this.artists = artists_list;
                    });
                };
                MembersComponent.prototype.onSelect = function (artist) {
                    this._router.parent.navigate(['/Artist', { id: artist.id }]);
                };
                MembersComponent = __decorate([
                    core_1.Component({
                        selector: 'members',
                        templateUrl: './partials/membersIndex.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink],
                        providers: [artists_service_1.ArtistService],
                    }), 
                    __metadata('design:paramtypes', [artists_service_1.ArtistService, router_1.Router])
                ], MembersComponent);
                return MembersComponent;
            }());
            exports_1("MembersComponent", MembersComponent);
        }
    }
});
//# sourceMappingURL=members.component.js.map