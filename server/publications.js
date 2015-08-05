Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'farm': 1}});
    } else {
        this.ready();
    }
});


Meteor.users.allow({
    update: function(userId, doc, fieldNames) {
        console.log('checking allow permissions');
        if(_.without(fieldNames, 'farm').length > 0) {
            return false;
        }
        console.log('changing valid fields');
        return userId === doc.userId;
    }
});

Meteor.users.deny({
    update: function(userId, doc, fieldNames) {
        console.log('checking allow permissions');
        if(_.without(fieldNames, 'farm').length > 0) {
            return true;
        }
        console.log('changing valid fields');
        return !(userId === doc.userId);
    }
});