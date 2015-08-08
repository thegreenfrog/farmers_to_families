Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'farm': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("userActivities", function(Id) {
   return[
     Posts.find({userId: Id})
   ];
});
