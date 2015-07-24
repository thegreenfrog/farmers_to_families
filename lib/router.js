Router.configure({
   layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/postSubmit', {name: 'producePost'});

Router.route('/farmerSubmit', {name: 'farmerSubmit'});

Router.route('/posts/:_id', {
    name: 'producePage',
    data: function() {
        return Posts.findOne(this.params._id);
    }
});

Router.route('/', {name: 'produceList'});

var requireLogin = function() {
    if (!Meteor.user()) {
        this.render('accessDenied');
    } else {
        this.next();
    }
}

if(Meteor.isClient)
{
    Router.onBeforeAction('dataNotFound', {only: 'postPage'});
    Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
}
