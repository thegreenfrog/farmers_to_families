Template.produceSubmit.events({
   'submit form': function(e){
       e.preventDefault();

       var post = {
           produce: $(e.target).find('[name=produce]').val(),
           price: parseFloat($(e.target).find('[name=price]').val())
       };

       var errors = validatePost(post);
       if (errors.produce || errors.price) {
           return Session.set('produceSubmitErrors', errors);
       }

       Meteor.call('postInsert', post, function(error, result) {
           if(error)
            return alert(error.reason);
           //if link already exists
           if(result.postExists)
            alert('This link has already been posted');

           Router.go('producePage', {_id: result._id});
       });
   }
});

Template.produceSubmit.onCreated(function() {
   Session.set('produceSubmitErrors', {});
});

Template.produceSubmit.helpers({
   errorClass: function(field) {
       return !!Session.get('produceSubmitErrors')[field] ? 'has-error' : '';
   },
    errorMessage: function(field) {
        return Session.get('produceSubmitErrors')[field];
    }
});