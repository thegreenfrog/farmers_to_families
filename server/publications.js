Meteor.publish('posts', function(options) {
    check(options, Object);

    return Posts.find({}, options);
});

Meteor.publish('farmers', function(options) {
    check(options, Object);

    return Farmers.find({}, options);
});

Meteor.publish('singleEdit', function(userId) {
    check(userId, String);
    return Posts.find(userId);
});