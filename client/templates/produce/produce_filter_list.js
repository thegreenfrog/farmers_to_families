Template.produceListFilter.onRendered(function() {
    if (!this.rendered){ //run only on first render
        Tracker.afterFlush(highlightCategory);
    }
});

function highlightCategory(){
    //console.log('disabling' +  Session.get('category'));
    $("#" + Session.get('category')).addClass('disabled-link');
}

Template.produceListFilter.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },
    currentCategory: function(category) {
        check(category, String);
        //console.log(this);
        if(String(this) == Session.get('category')){
            //console.log('matching category ' + category);
            $("#" + category).addClass('disabled-link');
            return true;
        }
        return false;
    },
    currentSubCategory: function(subcategory) {
        if(String(subcategory) == Session.get('subcategory')){
            //console.log('matching subcat');
            $("#" + subcategory).addClass('disabled-link');
            return true;
        }
        return false;
    },
    category: function() {
        return ['Vegetable', 'Fruit', 'Dairy'];
    },
    subCategory: function() {
        if(Session.get('category') == 'Vegetable') {
            return ['Carrots', 'Squash', 'Tomatoes', 'Potatoes', 'Kale', 'Avocado'];
        } else if(Session.get('category') == "Fruit"){
            return ['Apples', 'Oranges', 'Peaches', 'Pear', 'Grapes', 'Strawberries'];
        } else {
            return ['Milk', 'Cheese', 'Yogurt'];
        }
    }
});

Template.produceListFilter.events({
    'click .filter-link': function(e) {
        var $parent = $(e.target).closest('.filter-element');
        //console.log($parent.attr('id'));
        if($parent.attr('id') == "Vegetable" || $parent.attr('id') == "Fruit" || $parent.attr('id') == "Dairy") {
            console.log('set category');
            //console.log($parent.attr('id'));
            Session.set('category', $parent.attr('id'));
            Session.set('subCategory', '');
        } else {
            Session.set('subcategory', $parent.attr('id'));
            console.log('subcat');
        }
    }
});
