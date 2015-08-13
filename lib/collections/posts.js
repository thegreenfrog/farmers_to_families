Posts = new Mongo.Collection('posts');

if(Meteor.isServer) {
    Meteor.publish('allPosts', function() {
        return Posts.find();
    });

    Meteor.publish('singlePost', function(userId) {
        check(userId, String);
        return Posts.find(userId);
    });

    Meteor.publish('limitPosts', function(limit) {
        check(limit, Number);
        return Posts.find({}, {sort: {joined: -1}, limit: limit});
    });
}

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        console.log(fieldNames.price);
        return (_.without(fieldNames, 'produce', 'price').length > 0);
    }
});

validatePost = function(post) {
    var errors = {};
    if(!post.produce) {
        console.log('no produce')
        errors.produce = "Please fill in the name of the produce";
    }
    if(!post.price) {
        errors.price = "Please set a price per pound of the produce";
    }
    return errors;
}

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            produce: String,
            price: Number,
            category: String,
            subCategory: String
        });

        if(!Meteor.user().farm) {
            console.log('no registered farm under this account');
            throw new Meteor.Error('illegal post', 'must be a registered farm to post produce');
        }

        var errors = validatePost(postAttributes);
        if(errors.produce || errors.price) {
            throw new Meteor.Error('invalid post', 'please set a name and/or price for your produce you are posting');
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            farm: user.farm,
            farm_name: Farmers.findOne(user.farm).name,
            joined: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    }
});