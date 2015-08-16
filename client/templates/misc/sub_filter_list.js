Template.subFilter.helpers({
    subCategory: function() {
        if(String('vegetable') == String(this)) {
            return ['Carrots', 'Squash', 'Tomatoes', 'Potatoes', 'Kale', 'Avocado'];
        } else if(String('fruit') == String(this)){
            return ['Apples', 'Oranges', 'Peaches', 'Pear', 'Grapes', 'Strawberries'];
        } else {
            return ['Milk', 'Cheese', 'Yogurt'];
        }
    }
});