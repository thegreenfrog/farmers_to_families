Template.produceItem.helpers({
   ownPost: function() {
       return this.userId === Meteor.userId();
   }
});