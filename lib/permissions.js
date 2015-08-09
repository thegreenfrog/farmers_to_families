ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};

//check array for duplicates
function unique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]._id) ) { //it works with objects! in FF, at least
            hash[ arr[i]._id ] = true;
            result.push(arr[i]);
        }
    }
    return result;
};

Meteor.methods({
    searchDatabase: function(keys) {
        check(keys, [String]);

        var results = [];
        keys.forEach(function(element) {
            results = Posts.find({author: element}).fetch();
        });
        console.log(results.length);
        results = unique(results);

        console.log('results: ');
        results.forEach(function(result) {
            console.log(result);
        });
        console.log('total: ' + results.length);

        console.log('finish search');
        return;
    }
});