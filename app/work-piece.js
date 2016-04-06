System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WorkUpLoad;
    return {
        setters:[],
        execute: function() {
            WorkUpLoad = (function () {
                function WorkUpLoad(name, media, price, _id, description, keywords, mainFile, files, artist_fname, artist_lname, artist_id, numFiles, length, width, depth) {
                    this.name = name;
                    this.media = media;
                    this.price = price;
                    this._id = _id;
                    this.description = description;
                    this.keywords = keywords;
                    this.mainFile = mainFile;
                    this.files = files;
                    this.artist_fname = artist_fname;
                    this.artist_lname = artist_lname;
                    this.artist_id = artist_id;
                    this.numFiles = numFiles;
                    this.length = length;
                    this.width = width;
                    this.depth = depth;
                }
                return WorkUpLoad;
            }());
            exports_1("WorkUpLoad", WorkUpLoad);
        }
    }
});
//# sourceMappingURL=work-piece.js.map