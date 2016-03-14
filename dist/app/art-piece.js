System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Work;
    return {
        setters:[],
        execute: function() {
            Work = (function () {
                function Work(name, media, price, _id, description, keywords, mainFile, files, artist_fname, artist_lname, arist_id, numFiles) {
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
                    this.arist_id = arist_id;
                    this.numFiles = numFiles;
                }
                return Work;
            }());
            exports_1("Work", Work);
        }
    }
});
//# sourceMappingURL=art-piece.js.map