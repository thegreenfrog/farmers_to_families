
Template.produceEdit.helpers({

});

Template.produceEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var postId = this._id;

        var postProperties = {
            produce: $(e.target).find('[name=produce]').val(),
            price: parseFloat($(e.target).find('[name=price]').val())
        };
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
