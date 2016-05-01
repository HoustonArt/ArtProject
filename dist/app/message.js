System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Message;
    return {
        setters:[],
        execute: function() {
            Message = (function () {
                function Message(sender_id, receiver_id, sender_name, subject, content, date, _id, style) {
                    this.sender_id = sender_id;
                    this.receiver_id = receiver_id;
                    this.sender_name = sender_name;
                    this.subject = subject;
                    this.content = content;
                    this.date = date;
                    this._id = _id;
                    this.style = style;
                }
                return Message;
            }());
            exports_1("Message", Message);
        }
    }
});
//# sourceMappingURL=message.js.map