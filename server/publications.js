Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'farm': 1}});
    } else {
        this.ready();
    }
});

removeFarmer = function(userId) {
    Meteor.users.update({_id: Meteor.user()._id}, {$set: {'farm': null}}, function(error){
        console.log('computing in server');
        if(error) {
            throw new Meteor.Error(error);
        }
        Farmers.remove(userId);
        console.log('removed farmer');
    });
};
