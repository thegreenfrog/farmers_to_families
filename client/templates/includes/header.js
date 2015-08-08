Template.header.helpers({
   currentFarmer : function() {
       return Meteor.user().farm;
   },
    profileRoute: function() {
        var user = Meteor.users.findOne(Meteor.userId());
        return user._id;
    }
});