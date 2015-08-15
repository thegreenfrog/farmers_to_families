Template.produceListFilter.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    }
});

Template.produceListFilter.events({
    'click .input-checkbox': function(e) {
        e.preventDefault();
        var text = $(e.target).parent().parent().text();
        text = text.replace(/\s+/g, '').toLowerCase();
        console.log(text);
        Router.go('produceListFilter', {_filter: text});
        //get the filter and route to the new search page
    }
});
