Router.configure({
   layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return [
        Meteor.subscribe('posts', {sort: {submitted: -1}}),
        Meteor.subscribe('farmers', {sort: {submitted: -1}})
    ]; }
});

Router.route('/produceSubmit', {name: 'produceSubmit'});

Router.route('/farmerSubmit', {name: 'farmerSubmit'});

Router.route('/posts/:_id', {
    name: 'producePage',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/farmers/:_id', {
    name: 'farmersPage',
    data: function() {
        return Farmers.findOne(this.params._id);
    }
});

Router.route('/posts/:_id/edit', {
   name: 'produceEdit',
    waitOn: function() {
        return Meteor.subscribe('singleEdit', this.params._id);
    },
    data: function() {
        return Farmers.findOne(this.params._id);
    }
});

Router.route('/', {name: 'produceList'});
Router.route('/farmersList', {name: 'farmersList'});

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
