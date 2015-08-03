Template.produceEdit.onCreated(function() {
    Session.set('produceEditErrors', {});
});
Template.produceEdit.helpers({
    errorClass: function(field) {
        return !!Session.get('produceEditErrors')[field] ? 'has-error' : '';
    },
    errorMessage: function(field) {
        return Session.get('produceEditErrors')[field];
    }
});

Template.produceEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var postId = this._id;

        var postProperties = {
            produce: $(e.target).find('[name=produce]').val(),
            price: parseFloat($(e.target).find('[name=price]').val())
        };

        var errors = validatePost(postProperties, 'edit');
        if(errors.produce || errors.price) {
            console.log('errors');
            return Session.set('produceEditErrors', errors);
        }

        Posts.update(postId, {$set: postProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('producePage', {_id: postId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('produceList');
        }
    }
});
