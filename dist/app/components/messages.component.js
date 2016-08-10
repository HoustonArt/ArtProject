System.register(['angular2/core', 'angular2/common', '../../app/message', '../../app/services/database.service', '../../app/services/login.service'], function(exports_1, context_1) {
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
    var core_1, common_1, message_1, database_service_1, login_service_1;
    var MessageWriter, ZachDate, MessagesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (message_1_1) {
                message_1 = message_1_1;
            },
            function (database_service_1_1) {
                database_service_1 = database_service_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            MessageWriter = (function () {
                function MessageWriter(_databaseService) {
                    this._databaseService = _databaseService;
                    this.subject = '';
                    this.myevent = new core_1.EventEmitter();
                    this.newMessage = new message_1.Message('', '', '', '', '', 0, '', '');
                    this.notSubmitted = true;
                }
                MessageWriter.prototype.ngOnInit = function () {
                    this.newMessage.sender_id = this.sender_id;
                    this.newMessage.receiver_id = this.rec_id;
                    if (this.subject != '') {
                        this.newMessage.subject = 'Re: ' + this.subject;
                    }
                };
                MessageWriter.prototype.onSubmit = function () {
                    var _this = this;
                    this.newMessage.date = Date.now();
                    this._databaseService.pushToDatabase('messages/' + this.newMessage.receiver_id + '/received/', this.newMessage);
                    this._databaseService.pushToDatabase('messages/' + this.newMessage.sender_id + '/sent/', this.newMessage).then(function (err) {
                        _this.myevent.emit(null);
                        _this.notSubmitted = false;
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageWriter.prototype, "rec_id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageWriter.prototype, "sender_id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], MessageWriter.prototype, "subject", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], MessageWriter.prototype, "myevent", void 0);
                MessageWriter = __decorate([
                    core_1.Component({
                        selector: 'message-write',
                        templateUrl: './partials/message-write.html',
                        providers: [database_service_1.DatabaseService],
                        styles: [".ng-valid[required] {\n    border-left: 5px solid #42A948;\n      }\n  .ng-invalid {\n    border-left: 5px solid #a94442;\n  }"]
                    }), 
                    __metadata('design:paramtypes', [database_service_1.DatabaseService])
                ], MessageWriter);
                return MessageWriter;
            }());
            exports_1("MessageWriter", MessageWriter);
            ZachDate = (function () {
                function ZachDate() {
                }
                ZachDate.prototype.transform = function (val, args) {
                    var date = new Date(val);
                    var ds = date.toISOString().split('T');
                    return ds[0] + ' ' + ds[1].slice(0, 8);
                };
                ZachDate = __decorate([
                    core_1.Pipe({
                        name: 'zachdate'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ZachDate);
                return ZachDate;
            }());
            exports_1("ZachDate", ZachDate);
            MessagesComponent = (function () {
                function MessagesComponent(_databaseService, _loginService) {
                    var _this = this;
                    this._databaseService = _databaseService;
                    this._loginService = _loginService;
                    this._loginService.getUID().then(function (snap) {
                        _this.uid = snap['uid'];
                        _this.getMessages();
                    });
                }
                MessagesComponent.prototype.getMessages = function () {
                    var _this = this;
                    this._databaseService.getAllChildren('messages/' + this.uid + '/received/').then(function (mes) {
                        if (mes[0]) {
                            _this.messages = mes;
                            _this.currentMessage = _this.messages[0];
                            _this.messages[0].style = 'active';
                            _this.noMessage = false;
                        }
                        else {
                            _this.noMessage = true;
                        }
                    });
                    this._databaseService.getAllChildren('messages/' + this.uid + '/sent/').then(function (mes) {
                        if (mes[0]) {
                            _this.sentMessages = mes;
                            _this.noSentMessage = false;
                            _this.sentMessages[0].style = 'active';
                            _this.currentMessage = _this.sentMessages[0];
                        }
                        else {
                            _this.noSentMessage = true;
                        }
                    });
                };
                MessagesComponent.prototype.ngOnInit = function () {
                    if (this.messages) {
                        this.changeMessage(this.messages[0]);
                    }
                    else {
                        this.currentMessage = null;
                    }
                };
                MessagesComponent.prototype.changeMessage = function (mes) {
                    this.currentMessage.style = '';
                    mes.style = 'active';
                    this.currentMessage = mes;
                };
                MessagesComponent = __decorate([
                    core_1.Component({
                        selector: 'messages',
                        templateUrl: './partials/messages.html',
                        styles: ["\n   li:hover{background-color:#d3d3d3;}\n  "],
                        providers: [database_service_1.DatabaseService, login_service_1.LoginService],
                        pipes: [common_1.DatePipe, ZachDate],
                        directives: [MessageWriter]
                    }), 
                    __metadata('design:paramtypes', [database_service_1.DatabaseService, login_service_1.LoginService])
                ], MessagesComponent);
                return MessagesComponent;
            }());
            exports_1("MessagesComponent", MessagesComponent);
        }
    }
});
//# sourceMappingURL=messages.component.js.map