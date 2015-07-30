Template.producePage.helpers({
    ownPost: function() {
        return this.userId === Meteor.userId();
    }
});