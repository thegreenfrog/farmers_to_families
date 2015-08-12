Template.produceSubmit.events({
    'click .category': function(e) {
        e.preventDefault();
        console.log($(e.target).text());
        var newTitle = $(e.target).text();
        Session.set('category-title', newTitle);
        console.log('changing dropdown title');
    },
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
    Session.set('category-title', 'Select a Category');
});

Template.produceSubmit.helpers({
    categoryTitle: function() {
        return Session.get('category-title');
    },
   errorClass: function(field) {
       return !!Session.get('produceSubmitErrors')[field] ? 'has-error' : '';
   },
    errorMessage: function(field) {
        return Session.get('produceSubmitErrors')[field];
    }
});

$(".category").click(function() {
    console.log('clicked');
});

$("#category-title").click(function() {
    console.log('clicked');
});