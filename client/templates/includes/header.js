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
    },
    'submit form': function(e) {
        e.preventDefault();
        console.log('searching for something');
        //break up the text into individual words, pass them as array
        var searchSubmit = $(e.target).find('[name=text]').val();
        console.log(searchSubmit);
        var keys = String(searchSubmit).split(" ");

        var urlString = "";
        var first = true;
        keys.forEach(function(element) {
            if(first) {
                urlString = urlString.concat(element);
                first = false;
            }
            else {
                urlString = urlString + "+" + element;
            }
        });

        //go to search page passing it the search keys in the proper url format
        Router.go("searchPage", {_queryList: urlString});
    }
});