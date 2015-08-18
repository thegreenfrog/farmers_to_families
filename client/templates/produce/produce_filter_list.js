Template.produceListFilter.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },
    currentCategory: function(category) {
        check(category, String);
        //console.log(this);
        if(String(this) == Session.get('category')){
            console.log('matching category ' + category);
            $("#" + category).addClass('disabled-link');
            return true;
        }
        return false;
    },
    currentSubCategory: function() {
        if(String(this) == Session.get('subcategory')){
            console.log('matching subcat');
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
        var $parent = $(e.target).closest('div');
        //console.log($parent.attr('id'));
        if($parent.attr('class') == "filter-element") {
            console.log('set category');
            console.log($parent.attr('id'));
            Session.set('category', $parent.attr('id'));
            Session.set('subCategory', '');
        } else {
            Session.set('subcategory', $parent.attr('id'));
            console.log('subcat');
        }
    }
});
