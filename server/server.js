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
        lowerKey = element.toLowerCase();
        results = results.concat(
            Posts.find({author: lowerKey}).fetch(), Posts.find({produce: lowerKey}).fetch(),
            Farmers.find({author: lowerKey}).fetch(), Farmers.find({name: lowerKey}).fetch(),
            Farmers.find({state: lowerKey}).fetch(), Farmers.find({city: lowerKey}).fetch()
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