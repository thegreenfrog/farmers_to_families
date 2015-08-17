Template.subFilter.helpers({
    currentCategory: function(category) {
            check(category, String);
            return !(String(category) == String(this));
    }
});