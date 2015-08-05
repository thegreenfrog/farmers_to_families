ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}

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