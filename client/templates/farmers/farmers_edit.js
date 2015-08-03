Template.farmersEdit.onCreated(function() {
    Session.set('farmerEditErrors', {});
});
Template.farmersEdit.helpers({
    errorClass: function(field) {
        return !!Session.get('farmerEditErrors')[field] ? 'has-error' : '';
    },
    errorMessage: function(field) {
        return Session.get('farmerEditErrors')[field];
    }
});

Template.farmersEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var farmerId = this._id;

        var farmerProperties = {
            name: $(e.target).find('[name=name]').val(),
            city: $(e.target).find('[name=city]').val(),
            state: $(e.target).find('[name=state]').val(),
            description: $(e.target).find('[name=description]').val()
        };

        var errors = validateFarmer(farmerProperties);
        if(errors.name || errors.state || errors.city || errors.description) {
            console.log('errors!');
            return Session.set('farmerEditErrors', errors);
        }
        console.log('updating farmer');

        Farmers.update(farmerId, {$set: farmerProperties}, function(error) {
            if (error) {
                // display the error to the user
                alert(error.reason);
            } else {
                Router.go('farmersPage', {_id: farmerId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentFarmerId = this._id;
            Farmers.remove(currentFarmerId);
            var farmerPosts = Posts.find({userId: this.userId});
            farmerPosts.forEach(function(post){
                Posts.remove(post._id);
            })
            Router.go('farmersList');
        }
    }
});
