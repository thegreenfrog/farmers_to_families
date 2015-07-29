Template.produceList.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    }
});