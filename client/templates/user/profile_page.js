Template.profilePage.helpers({
   activities: function() {
       return Posts.find();
   },
    farmExists: function() {
        return !!Meteor.user().farm;
    }
});