System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var DatabaseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DatabaseService = (function () {
                function DatabaseService() {
                    this.ref = new Firebase("https://artlike.firebaseIO.com/");
                }
                DatabaseService.prototype.pushToDatabase = function (path, data) {
                    return Promise.resolve(this.ref.child(path).push(data, function () { }).then(function (_ref) {
                        return Promise.resolve(_ref);
                    }));
                };
                DatabaseService.prototype.checkChildNumber = function (path) {
                    var _num;
                    return Promise.resolve(this.ref.child(path).once("value", function (data) {
                        _num = data.numChildren();
                    }).then(function () {
                        return Promise.resolve(_num);
                    }));
                };
                DatabaseService.prototype.getObject = function (path) {
                    var _data;
                    return Promise.resolve(this.ref.child(path).once("value", function (data) {
                        _data = data.val();
                    }).then(function () {
                        return Promise.resolve(_data);
                    }));
                };
                DatabaseService.prototype.getAllChildren = function (path) {
                    var _data = [];
                    var _retData;
                    return Promise.resolve(this.ref.child(path).once('value', function (snap) {
                        snap.forEach(function (childSnap) {
                            var _snap = childSnap.val();
                            _snap['_id'] = childSnap.key();
                            _data.push(_snap);
                        });
                    }).then(function () {
                        _retData = _data;
                        return Promise.resolve(_retData);
                    })).catch(function () {
                        _retData = null;
                        Promise.resolve(_retData);
                    });
                };
                DatabaseService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DatabaseService);
                return DatabaseService;
            }());
            exports_1("DatabaseService", DatabaseService);
        }
    }
});
//# sourceMappingURL=database.service.js.map