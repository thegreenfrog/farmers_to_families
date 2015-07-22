Template.farmersList.helpers({
   farmers: function() {
       return Farmers.find({}, {sort: {submitted: -1}});
   }
});