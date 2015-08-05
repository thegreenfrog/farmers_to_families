Router.configure({
   layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        Meteor.subscribe("userData");
    }
});

Router.route('/produceSubmit', {name: 'produceSubmit'});

Router.route('/farmerSubmit', {name: 'farmerSubmit'});

Router.route('/posts/:_id', {
    name: 'producePage',
    waitOn: function() {
        Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/farmers/:_id', {
    name: 'farmersPage',
    waitOn: function() {
        Meteor.subscribe('singleFarmer', this.params._id);
    },
    data: function() {
        return Farmers.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
   name: 'produceEdit',
    waitOn: function() {
        Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/farmers/:_id/edit', {
    name: 'farmersEdit',
    waitOn: function() {
        Meteor.subscribe('singleFarmer', this.params._id);
    },
    data: function() {
        return Farmers.findOne(this.params._id);
    }
});

Router.route('/', {
    name: 'produceList',
    waitOn: function() {
        var ITEMS_INCREMENT = 10;
        Session.setDefault('itemsLimitPosts', ITEMS_INCREMENT);
        Deps.autorun(function() {
            Meteor.subscribe('limitPosts', Session.get('itemsLimitPosts'));
        });
    }
});
Router.route('/farmersList', {
    name: 'farmersList',
    waitOn: function() {
        var FARMERS_INCREMENT = 10;
        Session.setDefault('itemsLimitFarmers', FARMERS_INCREMENT);
        Deps.autorun(function() {
            Meteor.subscribe('limitFarmers', Session.get('itemsLimitFarmers'));
        });
    }
});

var requireLogin = function() {
    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}

if(Meteor.isClient)
{
    Router.onBeforeAction('dataNotFound', {only: 'producePage'});
    Router.onBeforeAction('dataNotFound', {only: 'farmersPage'});
    Router.onBeforeAction(requireLogin, {only: 'produceSubmit'});
    Router.onBeforeAction(requireLogin, {only: 'farmersSubmit'});
}
