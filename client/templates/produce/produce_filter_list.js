Template.produceListFilter.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },
    currentCategory: function(category) {
        check(category, String);
        console.log(this);
        console.log(category);
        return !(String(category) == String(this));
    }
});
