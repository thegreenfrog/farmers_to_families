Template.producePost.events({
   'submit form': function(e){
       e.preventDefault();

       var post = {
           produce: $(e.target).find('[name=produce]').val(),
           price: $(e.target).find('[name=price]').val(),
           author: Meteor.user()
       };

       Meteor.call('postInsert', post, function(error, result) {
          if(error)
            return alert(error.reason);

           //if link already exists
           if(result.postExists)
            alert('This link has already been posted');
           Router.go('postPoage', {_id: result._id});
       });
   }
});