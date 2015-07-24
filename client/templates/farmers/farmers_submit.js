Template.farmerSubmit.events({
   'submit form': function(e) {
       e.preventDefault();

       var farmer = {
           name: $(e.target).find('[name=title]').val(),
           location: $(e.target).find('[name=location]').val(),
           description: $(e.target).find('[name=description]').val()
       };

       Meteor.call('farmerInsert', farmer, function(error, result) {
          if(error) {
              return throwError(error.reason);
          }
           if(result.postExists) {
               throwError('There is already a farm listed under this name. Please use a different name.');
           }

           Router.go('farmersPage', {_id: result._id});
       });
   }
});