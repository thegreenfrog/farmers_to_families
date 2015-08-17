Template.produceListFilter.helpers({
    posts: function() {
        return Posts.find({}, {sort: {joined: -1}});
    },
    currentCategory: function() {
        //console.log(this);
        if(String(this) == Session.get('category')){
            console.log('matching category');
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
        console.log('compare');
        console.log(String(this));
        console.log(Session.get('category'));
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
        if($parent.attr('id') == "category-filter") {
            //console.log($(e.target).attr('id'));
            Session.set('category', $(e.target).attr('id'));
            console.log('set category')
            Session.set('subCategory', '');
            //console.log('category');
        } else {
            Session.set('subcategory', $(e.target).attr('id'));
            //console.log('subcat');
        }
    }
});
