System.register(['angular2/core'], function(exports_1) {
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
    var ArtistDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ArtistDetailComponent = (function () {
                function ArtistDetailComponent() {
                }
                ArtistDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'artist-detail',
                        template: "\n  <div *ngIf = \"artist\">\n    <h2> {{artist.name}}</h2>\n    <div><label> id:</label> {{artist.id}}</div>\n    <div><ul>\n      <li *ngFor=\"#work of artist.works\">\n        {{work.name}}\n      </li>\n    </ul></div>\n  </div>",
                        inputs: ['artist']
                    }), 
                    __metadata('design:paramtypes', [])
                ], ArtistDetailComponent);
                return ArtistDetailComponent;
            })();
            exports_1("ArtistDetailComponent", ArtistDetailComponent);
        }
    }
});
//# sourceMappingURL=artist-detail.component.js.map