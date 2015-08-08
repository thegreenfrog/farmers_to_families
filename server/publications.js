Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'farm': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("userActivities", function() {
    if(this.userId) {
        var user = Meteor.users.findOne(this.userId);
        return[
            Posts.find({userId: user._id})
        ];
    }
});
