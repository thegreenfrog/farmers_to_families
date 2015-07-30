Template.farmersList.helpers({
   farmers: function() {
       return Farmers.find({}, {sort: {joined: -1}});
   }
});