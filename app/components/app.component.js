System.register(['angular2/core', 'angular2/router', './artist-detail.component', './work-detail.component', './artists.component', './about.component', './home.component', './works.component', './art-search.component', './gallery-creator.component', './gallery-viewer.component', './new-user.component', './login.component', './new-work.component', './user-panel.component'], function(exports_1, context_1) {
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
    var core_1, router_1, artist_detail_component_1, work_detail_component_1, artists_component_1, about_component_1, home_component_1, works_component_1, art_search_component_1, gallery_creator_component_1, gallery_viewer_component_1, new_user_component_1, login_component_1, new_work_component_1, user_panel_component_1;
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
            },
            function (works_component_1_1) {
                works_component_1 = works_component_1_1;
            },
            function (art_search_component_1_1) {
                art_search_component_1 = art_search_component_1_1;
            },
            function (gallery_creator_component_1_1) {
                gallery_creator_component_1 = gallery_creator_component_1_1;
            },
            function (gallery_viewer_component_1_1) {
                gallery_viewer_component_1 = gallery_viewer_component_1_1;
            },
            function (new_user_component_1_1) {
                new_user_component_1 = new_user_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (new_work_component_1_1) {
                new_work_component_1 = new_work_component_1_1;
            },
            function (user_panel_component_1_1) {
                user_panel_component_1 = user_panel_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.isLoggedIn = false;
                    this.doLogin = false;
                    this.hideModal = true;
                    this.router = router;
                    this.ref = new Firebase(this.firebaseUrl);
                    this.authLogin();
                }
                AppComponent.prototype.authLogin = function () {
                    var _this = this;
                    this.authData = this.ref.getAuth();
                    if (this.authData != null) {
                        this.isLoggedIn = true;
                        var userBase = new Firebase(this.firebaseUrl + 'users/' + this.authData.uid);
                        userBase.once("value", function (data) {
                            _this.user = data.val();
                            _this.numWorks = data.child('Works').numChildren();
                        });
                    }
                };
                AppComponent.prototype.createLogin = function () {
                    this.hideModal = false;
                };
                AppComponent.prototype.logOut = function () {
                    this.ref.unauth();
                    this.isLoggedIn = false;
                    this.user = null;
                };
                AppComponent.prototype.accountInfo = function () {
                    var outstr = '';
                    if (this.user) {
                        outstr += 'Welcome to ArtLike ' + this.user.firstName + '\n';
                        outstr += 'You have ' + this.numWorks.toString() + ' works!';
                    }
                    else {
                        outstr += 'Not logged in';
                    }
                    alert(outstr);
                };
                AppComponent.prototype.handleLoginEvent = function (arg) {
                    this.hideModal = true;
                    if (arg != "newUser") {
                        this.authLogin();
                    }
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: './partials/mainpage.html',
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, login_component_1.Login],
                        styles: ['[hidden] {display: none;}']
                    }),
                    router_1.RouteConfig([
                        { path: '/', component: home_component_1.HomeComponent, as: 'Home' },
                        { path: '/artists/', component: artists_component_1.ArtistsComponent, as: 'Artists' },
                        { path: '/artist/:id', component: artist_detail_component_1.ArtistDetailComponent, as: 'Artist' },
                        { path: '/about', component: about_component_1.AboutComponent, as: 'About' },
                        { path: '/work/:id', component: work_detail_component_1.WorkDetailComponent, as: 'Work' },
                        { path: '/works/', component: works_component_1.AllWorksComponent, as: 'Works' },
                        { path: '/artsearch/', component: art_search_component_1.ArtSearchComponent, as: 'ArtSearch' },
                        { path: '/gallery-create/', component: gallery_creator_component_1.GalleryCreatorComponent, as: 'GalleryCreate' },
                        { path: '/gallery-view/:id', component: gallery_viewer_component_1.GalleryViewerComponent, as: 'GalleryView' },
                        { path: '/new-user/', component: new_user_component_1.NewUser, as: 'NewUser' },
                        { path: '/new-work/', component: new_work_component_1.NewWork, as: 'NewWork' },
                        { path: '/user-panel/', component: user_panel_component_1.UserPanelComponent, as: 'User' }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map