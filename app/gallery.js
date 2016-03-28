System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Gallery;
    return {
        setters:[],
        execute: function() {
            Gallery = (function () {
                function Gallery(id, name, curator, info) {
                    this.id = id;
                    this.name = name;
                    this.curator = curator;
                    this.info = info;
                }
                Gallery.prototype.stringify = function () {
                    var outstring;
                    var name = this.name.replace(/\s/g, "%");
                    var curator = this.curator.replace(/\s/g, "%");
                    return name + '@' + curator;
                };
                return Gallery;
            }());
            exports_1("Gallery", Gallery);
        }
    }
});
//# sourceMappingURL=gallery.js.map