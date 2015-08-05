Template.farmersPage.helpers({
    date: function() {
        //get the date mm/dd/yyyy
        console.log('farmer id: ' + Meteor.user().farm);
        var today = this.joined;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        today = mm+'/'+dd+'/'+yyyy;
        return today;
    },

    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },

    moreResults: function() {
        //if we have fewer rows than we asked for when subscribing, then we have all the items in the collections
        return !(Posts.find().count() < Session.get("postLimitFarmer"));
    }
});
