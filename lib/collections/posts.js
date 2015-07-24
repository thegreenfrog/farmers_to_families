Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            produce: String,
            price: Number,
        });

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            joined: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    }
});