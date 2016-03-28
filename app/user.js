System.register([], function(exports_1) {
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User(id, firstName, lastName, locationCity, locationState, description, email, info) {
                    this.id = id;
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.locationCity = locationCity;
                    this.locationState = locationState;
                    this.description = description;
                    this.email = email;
                    this.info = info;
                }
                return User;
            })();
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map