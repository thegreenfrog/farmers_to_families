Meteor.publish('farmers', function() {
    return Farmers.find();
});