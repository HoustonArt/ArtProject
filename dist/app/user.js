System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, firstName, lastName, locationCity, locationState, description, profilePic, info) {
                    this.id = id;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.locationCity = locationCity;
                    this.locationState = locationState;
                    this.description = description;
                    this.profilePic = profilePic;
                    this.info = info;
                }
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map