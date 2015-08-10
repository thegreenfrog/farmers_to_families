Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'farm': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("userActivities", function(username) {
    check(username, String);
    return[
        Posts.find({author: username})
    ]
});

Meteor.publish("searchResults", function (urlString) {
    check(urlString, String);

    var result = searchDatabase(urlString);

    return [
        Posts.find({_id: {$in: result}}),
        Farmers.find({_id: {$in: result}})
    ];

});
