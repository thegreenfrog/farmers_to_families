Template.farmerSubmit.onCreated(function() {
   Session.set('farmerSubmitErrors', {});
});

Template.farmerSubmit.helpers({
   errorClass: function(field) {
       return !!Session.get('farmerSubmitErrors')[field] ? 'has-error' : '';
   },
    errorMessage: function(field) {
        return Session.get('farmerSubmitErrors')[field];
    }
});

Template.farmerSubmit.events({
   'submit form': function(e) {
       e.preventDefault();

       var farmer = {
           name: $(e.target).find('[name=name]').val(),
           city: $(e.target).find('[name=city]').val(),
           state: $(e.target).find('[name=state]').val(),
           description: $(e.target).find('[name=description]').val()
       };

       var errors = validateFarmer(farmer);
       if(errors.name || errors.state || errors.city || errors.description || errors.duplicate) {
           return Session.set('farmerSubmitErrors', errors);
       }

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