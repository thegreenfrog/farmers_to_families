Template.header.helpers({
   currentFarmer : function() {
       return Meteor.user().farm;
   },
    profileRoute: function() {
        var user = Meteor.users.findOne(Meteor.userId());
        return user.username;
    }
});

Template.header.events({
    'keypress #search-button': function() {
        $('button').prop('disabled', false);
        console.log('disabled button');
    }
});