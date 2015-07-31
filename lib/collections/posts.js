Posts = new Mongo.Collection('posts');

if(Meteor.isServer) {
    Meteor.publish('allPosts', function() {
        return Posts.find();
    });

    Meteor.publish('singleEdit', function() {
        return Posts.find(userId);
    });
}

Posts.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'produce', 'price').length > 0);
    }
});

Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            produce: String,
            price: Number,
        });

        //get the date mm/dd/yyyy and time
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var hour = today.getHours();
        var min = today.getMinutes();
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        var halfday = 'AM';
        if(hour === 24) {
            hour -=12;
        } else if(hour > 12) {
            hour -= 12
            halfday = 'PM';
        }
        if(min<10) {
            min = '0'+min;
        }
        today = mm+'/'+dd+'/'+yyyy + '  ' +hour+':'+min+' '+halfday;

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            joined: today
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        }
    }
});