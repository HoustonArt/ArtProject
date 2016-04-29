System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GalleryContainer, Gallery;
    return {
        setters:[],
        execute: function() {
            GalleryContainer = (function () {
                function GalleryContainer(info, works) {
                    this.info = info;
                    this.works = works;
                }
                return GalleryContainer;
            }());
            exports_1("GalleryContainer", GalleryContainer);
            Gallery = (function () {
                function Gallery(user_id, id, name, curator, info) {
                    this.user_id = user_id;
                    this.id = id;
                    this.name = name;
                    this.curator = curator;
                    this.info = info;
                }
                return Gallery;
            }());
            exports_1("Gallery", Gallery);
        }
    }
});
//# sourceMappingURL=gallery.js.map