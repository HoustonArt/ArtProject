System.register([], function(exports_1) {
    var WorkUpLoad;
    return {
        setters:[],
        execute: function() {
            WorkUpLoad = (function () {
                function WorkUpLoad(name, media, price, _id, description, keywords, mainFile, files, artist_fname, artist_lname, arist_id, numFiles) {
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
                return WorkUpLoad;
            })();
            exports_1("WorkUpLoad", WorkUpLoad);
        }
    }
});
//# sourceMappingURL=work-piece.js.map