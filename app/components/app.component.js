System.register(['angular2/core', 'angular2/router', './artist-detail.component', './work-detail.component', './artists.component', './about.component', './home.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, artist_detail_component_1, work_detail_component_1, artists_component_1, about_component_1, home_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (artist_detail_component_1_1) {
                artist_detail_component_1 = artist_detail_component_1_1;
            },
            function (work_detail_component_1_1) {
                work_detail_component_1 = work_detail_component_1_1;
            },
            function (artists_component_1_1) {
                artists_component_1 = artists_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: './partials/mainpage.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink]
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_component_1.HomeComponent, as: 'Home' },
                        { path: '/artists/', component: artists_component_1.ArtistsComponent, as: 'Artists' },
                        { path: '/artist/:id', component: artist_detail_component_1.ArtistDetailComponent, as: 'Artist' },
                        { path: '/about', component: about_component_1.AboutComponent, as: 'About' },
                        { path: '/work/:id', component: work_detail_component_1.WorkDetailComponent, as: 'Work' }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map