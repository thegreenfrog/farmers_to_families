Template.farmersList.helpers({
   farmers: function() {
       return Farmers.find({}, {sort: {joined: -1}});
   },

    moreResults: function() {
        //if we have fewer rows than we asked for when subscribing, then we have all the items in the collections
        return !(Farmers.find().count() < Session.get("itemsLimitFarmers"));
    }
});

// whenever #showMoreResults becomes visible, retrieve more results
function showMoreVisible() {
    var threshold, target = $("#showMoreResults");

    var path = Iron.Location.get().path;

    if(path.search('farmersList') != -1) {
        var ITEMS_INCREMENT = 10;
        if (!target.length) {
            return;
        }

        threshold = $(window).scrollTop() + $(window).height() - target.height();
        if (target.offset().top <= threshold) {
            if (!target.data("visible")) {
                //console.log("target became visible (inside viewable area)");
                target.data("visible", true);
                Session.set("itemsLimitFarmers",
                    Session.get("itemsLimitFarmers") + ITEMS_INCREMENT);
            }
        } else {
            if (target.data("visible")) {
                //console.log("target became invisible (below viewable area)");
                target.data("visible", false);
            }
        }
    } else if(path.search('farmers') != -1) {
        var ITEMS_INCREMENT = 5;
        if (!target.length) {
            return;
        }

        threshold = $(window).scrollTop() + $(window).height() - target.height();
        if (target.offset().top <= threshold) {
            if (!target.data("visible")) {
                //console.log("target became visible (inside viewable area)");
                target.data("visible", true);
                Session.set("postLimitFarmer",
                    Session.get("postLimitFarmer") + ITEMS_INCREMENT);
            }
        } else {
            if (target.data("visible")) {
                //console.log("target became invisible (below viewable area)");
                target.data("visible", false);
            }
        }
    }

}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);