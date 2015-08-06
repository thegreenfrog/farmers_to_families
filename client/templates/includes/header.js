Template.header.helpers({
   currentFarmer : function() {
       return Meteor.user().farm;
   }
});