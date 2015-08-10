Template.searchPage.helpers({
    searchPost: function() {
        return Posts.find();
    },
    searchFarm: function() {
        return Farmers.find();
    }
});