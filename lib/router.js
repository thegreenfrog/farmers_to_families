Router.configure({
   layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
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
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/', {
    name: 'produceList',
    waitOn: function() {
        return Meteor.subscribe('limitPosts', 20);
    }
});
Router.route('/farmersList', {
    name: 'farmersList',
    waitOn: function() {
        return Meteor.subscribe('limitFarmers', 20);
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
