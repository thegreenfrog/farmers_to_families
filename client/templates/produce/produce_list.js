Template.produceList.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },
    category: function() {
        return ['Vegetable', 'Fruit', 'Dairy'];
    },
    moreResults: function() {
        //if we have fewer rows than we asked for when subscribing, then we have all the items in the collections
        return !(Posts.find().count() < Session.get("itemsLimitPosts"));
    }
});

Template.produceList.events({
    'click .filter-link': function(e) {
        console.log('set category');
        var category = $(e.target).closest('div').attr('id');
        console.log(category);
        Session.set('category', category);
    }
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");
    var ITEMS_INCREMENT = 10;
    if (!target.length) {
        return;
    }

    threshold = $(window).scrollTop() + $(window).height() - target.height();
    if (target.offset().top <= threshold) {
        if (!target.data("visible")) {
            //console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("itemsLimitPosts",
                Session.get("itemsLimitPosts") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            //console.log("target became invisible (below viewable area)");
            target.data("visible", false);
        }
    }
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);