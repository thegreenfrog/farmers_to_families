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

searchDatabase = function(urlString) {
    check(urlString, String);

    var keys = urlString.split("+");
    console.log('search keys: ');
    keys.forEach(function(element) {
        console.log(element);
    });

    var results = [];
    keys.forEach(function(element) {
        results = results.concat(
            Posts.find({author: element}).fetch(), Posts.find({produce: element}).fetch(),
            Farmers.find({author: element}).fetch(), Farmers.find({name: element}).fetch(),
            Farmers.find({state: element}).fetch(), Farmers.find({city: element}).fetch()
        );
    });
    console.log(results.length);
    results = unique(results);

    console.log('results: ');

    var searchId = [];
    results.forEach(function(result) {
        console.log(result._id);
        searchId.push(result._id);
    });
    console.log('total: ' + results.length);

    console.log('finish search');

    return searchId;

}