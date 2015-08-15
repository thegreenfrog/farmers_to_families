Template.produceList.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },

    moreResults: function() {
        //if we have fewer rows than we asked for when subscribing, then we have all the items in the collections
        return !(Posts.find().count() < Session.get("itemsLimitPosts"));
    }
});

Template.produceList.events({
    'click .input-checkbox': function(e) {
        e.preventDefault();
        console.log('clicked on filter');
        console.log($(e.target).parent().text());
        console.log($(e.target).parent().html());
        console.log($($(e.target).parent()).text());
        //get the filter and route to the new search page
        return;
    },
    'submit form': function(e) {
        e.preventDefault();
        console.log('submit');
        //console.log(document.getElementById("vegetable").checked);
        console.log($(e.target).find('[id=vegetable]').attr('checked'));
        console.log($(e.target).find('[id=vegetable]').checked);
        var filterTarget = $(e.target).text();
        //route to different url
        return;
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