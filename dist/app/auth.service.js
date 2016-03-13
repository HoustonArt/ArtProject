System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Auth;
    return {
        setters:[],
        execute: function() {
            Auth = (function () {
                function Auth() {
                    this.firebaseUrl = "https://artlike.firebaseIO.com/";
                    this.boolean = false;
                    this.ref = new Firebase(this.firebaseUrl);
                    this.authData = this.ref.getAuth();
                    if (this.authData != null) {
                        this.isLoggedIn = true;
                    }
                    else {
                        this.isLoggedIn = false;
                    }
                }
                return Auth;
            }());
            exports_1("Auth", Auth);
        }
    }
});
//# sourceMappingURL=auth.service.js.map