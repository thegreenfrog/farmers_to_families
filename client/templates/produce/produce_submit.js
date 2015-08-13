Template.produceSubmit.events({
    'click .category': function(e) {
        e.preventDefault();
        console.log($(e.target).text());
        var newTitle = $(e.target).text();
        Session.set('category-value', newTitle);
        Session.set('category-title', newTitle);
        console.log('changing dropdown title');
        $('#subCat').removeClass('hidden');
        $('#' + newTitle).removeClass('hidden');
    },
    'click .type': function(e) {
        e.preventDefault();
        console.log($(e.target).text());
        var newTitle = $(e.target).text();
        Session.set('subCategory-value', newTitle);
        Session.set('subCategory-title', newTitle);
    },
   'submit form': function(e){
       e.preventDefault();

       var post = {
           produce: $(e.target).find('[name=produce]').val().toLowerCase(),
           price: parseFloat($(e.target).find('[name=price]').val()),
           category: Session.get('category-value').toLowerCase(),
           subCategory: Session.get('subCategory-value').toLowerCase()
       };

       console.log('category of post: ');
       console.log(post.category);
       console.log(post.subCategory);
       console.log('stopping submit');
       //return;

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
    Session.set('subCategory-title', 'SubCategory');
});

Template.produceSubmit.helpers({
    categoryTitle: function() {
        return Session.get('category-title');
    },
    subCategoryTitle: function() {
        return Session.get('subCategory-title');
    },
   errorClass: function(field) {
       return !!Session.get('produceSubmitErrors')[field] ? 'has-error' : '';
   },
    errorMessage: function(field) {
        return Session.get('produceSubmitErrors')[field];
    }
});