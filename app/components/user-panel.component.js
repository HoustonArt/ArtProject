System.register(['angular2/core', 'angular2/router', './messages.component', './new-work.component', './new-user.component', '../../app/services/database.service'], function(exports_1, context_1) {
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
    var core_1, router_1, messages_component_1, new_work_component_1, new_user_component_1, database_service_1;
    var UserPanelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (messages_component_1_1) {
                messages_component_1 = messages_component_1_1;
            },
            function (new_work_component_1_1) {
                new_work_component_1 = new_work_component_1_1;
            },
            function (new_user_component_1_1) {
                new_user_component_1 = new_user_component_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            }],
        execute: function() {
            UserPanelComponent = (function () {
                // construct widget.
                // authenticate firebase user
                function UserPanelComponent(_databaseService) {
                    var _this = this;
                    this._databaseService = _databaseService;
                    this.works = [];
                    this.galleries = [];
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.isLoggedIn = false;
                    this.maxNumWorks = 15;
                    this.maxNumGals = 5;
                    this.noEdit = true;
                    this.editUser = false;
                    this.displayGalleries = false;
                    this.displayWorks = false;
                    this.base = new Firebase(this.firebaseUrl);
                    this.base.onAuth(function (authdata) {
                        _this.authDataCallback(authdata);
                    });
                }
                // if user is logged in, set isLogggedIn boolean to true
                // get number of messages both send and recieved
                // TODO: move messsages into service
                UserPanelComponent.prototype.authDataCallback = function (authData) {
                    var _this = this;
                    if (authData) {
                        this.isLoggedIn = true;
                        this.userPath = 'users/' + authData.uid;
                        this.base.child(this.userPath).once("value", function (data) {
                            _this.user = data.val();
                            _this._initiateObjects(_this.user);
                        });
                        this._databaseService.checkChildNumber('messages/' + authData.uid + '/received').then(function (data) { _this.numMesRec = data; });
                        this._databaseService.checkChildNumber('messages/' + authData.uid + '/sent').then(function (data) { _this.numMesSent = data; });
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                };
                UserPanelComponent.prototype._initiateObjects = function (_user) {
                    //already have it from getting user before
                    this.numWorks = 0;
                    this.numGals = 0;
                    for (var i in _user.Works) {
                        this.works[this.numWorks] = _user.Works[i];
                        this.numWorks = this.numWorks + 1;
                    }
                    for (var i in _user.Galleries) {
                        this.galleries[this.numGals] = _user.Galleries[i];
                        this.numGals = this.numGals + 1;
                    }
                    if (this.numGals > 0) {
                        this.galPerc = this.numGals / this.maxNumGals * 100;
                        this.displayGalleries = true;
                    }
                    if (this.works.length > 0) {
                        this.workPerc = this.numWorks / this.maxNumWorks * 100;
                        this.displayWorks = true;
                    }
                };
                // Function to set up editing template
                UserPanelComponent.prototype.edit = function (picture) {
                    var _this = this;
                    var pic_id = picture.split('/').pop(-1);
                    this.noEdit = false;
                    this.base.child(this.userPath).child('Works').child(pic_id).once("value", function (data) {
                        _this.work = data.val();
                        _this.work._id = pic_id;
                    });
                };
                // Function to set up profile editing
                UserPanelComponent.prototype.editProfile = function () {
                    this.noEdit = false;
                    this.editUser = true;
                };
                //handle when image is submitted
                UserPanelComponent.prototype.handleDoneEvent = function (evt) {
                    this.noEdit = true;
                    this.work = null;
                    this.editUser = false;
                    alert('work edited');
                };
                UserPanelComponent = __decorate([
                    core_1.Component({
                        selector: 'user-panel',
                        templateUrl: './partials/user-panel.html',
                        styles: ["\n    .ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n\n    .ng-invalid {\n      border-left: 5px solid #a94442;\n    }\n      "],
                        directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterLink, new_work_component_1.NewWork, new_user_component_1.NewUser, messages_component_1.MessagesComponent],
                        providers: [database_service_1.DatabaseService]
                    }), 
                    __metadata('design:paramtypes', [database_service_1.DatabaseService])
                ], UserPanelComponent);
                return UserPanelComponent;
            }());
            exports_1("UserPanelComponent", UserPanelComponent);
        }
    }
});
//# sourceMappingURL=user-panel.component.js.map