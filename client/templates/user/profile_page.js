Template.profilePage.helpers({
   activities: function() {
       return Posts.find();
   },
    farmExists: function() {
        return !!Meteor.user().farm;
    },
    thisFarm: function() {
        var user = Farmers.findOne({_id: Meteor.user().farm});
        return user.name;
    }
});