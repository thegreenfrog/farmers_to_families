Template.producePost.events({
   'submit form': function(e){
       e.preventDefault();

       var post = {
           produce: $(e.target).find('[name=produce]').val(),
           price: parseFloat($(e.target).find('[name=price]').val())
       };

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