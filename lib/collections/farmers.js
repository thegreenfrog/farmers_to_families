Farmers = new Mongo.Collection('farmers');

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            produce: String,
            price: Number
        });

        //check for duplicates
        var postWithSameLink = Farmers.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Farmers.insert(post);
        return {
            _id: postId
        }
    }
});