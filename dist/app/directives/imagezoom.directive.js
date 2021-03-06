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
    var BooleanHoverChange;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BooleanHoverChange = (function () {
                function BooleanHoverChange(el) {
                    this._el = el.nativeElement;
                }
                BooleanHoverChange.prototype.onMouseEnter = function () {
                    this.bool = true;
                };
                BooleanHoverChange.prototype.onMouseLeave = function () {
                    this._el.style.visibility = 'hidden';
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], BooleanHoverChange.prototype, "bool", void 0);
                BooleanHoverChange = __decorate([
                    core_1.Directive({
                        selector: '[boolean-hover-change]',
                        host: {
                            '(mouseEnter)': 'onMouseEnter()',
                            '(mouseLeave)': 'onMouseLeave()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BooleanHoverChange);
                return BooleanHoverChange;
            }());
            exports_1("BooleanHoverChange", BooleanHoverChange);
        }
    }
});
//# sourceMappingURL=imagezoom.directive.js.map