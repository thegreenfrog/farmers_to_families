Router.configure({
   layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        Meteor.subscribe("userData");
        var lastUser=null;
        Deps.autorun(function(){
            var userId = Meteor.userId();
            if(userId){
                //console.log(userId+" connected");
                // do something with Meteor.user()
            }
            else if(lastUser){
                //console.log(lastUser._id+" disconnected");
                // can't use Meteor.user() anymore
                Router.go('produceList');
            }
            lastUser = Meteor.userId();
        });
    }
});

Router.route('/produceSubmit', {name: 'produceSubmit'});

Router.route('/farmerSubmit', {name: 'farmerSubmit'});

Router.route('/search/:_queryList', {
    name: 'searchPage',
    waitOn: function() {
        console.log('url: ' + this.params._queryList);
        Meteor.subscribe('searchResults', this.params._queryList);
        console.log(Posts.find().count());
    }
});

Router.route('/user/:_username', {
   name: 'profilePage',
    waitOn: function() {
        Meteor.subscribe('userActivities', this.params._username);
        console.log(Posts.find().count());
    }
});

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
        var farmerID = this.params._id
        var ITEMS_INCREMENT = 5;
        Session.setDefault('postLimitFarmer', ITEMS_INCREMENT);
        Deps.autorun(function() {
            Meteor.subscribe('singleFarmer', farmerID, Session.get('postLimitFarmer'));
        });
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
        Meteor.subscribe('editFarmer', this.params._id);
    },
    data: function() {
        return Farmers.findOne(this.params._id);
    }
});

Router.route('/', {
    name: 'produceList',
    waitOn: function() {
        var ITEMS_INCREMENT = 12;
        Session.setDefault('itemsLimitPosts', ITEMS_INCREMENT);
        Deps.autorun(function() {
            Meteor.subscribe('limitPosts', Session.get('itemsLimitPosts'));
        });
    }
});

Router.route('/produceList/:_filter', {
    name: 'produceListFilter',
    waitOn: function() {
        Meteor.subscribe('produceFilter', this.params._filter);
    },
    data: function() {
        return this.params._filter;
    }
});

Router.route('/farmersList', {
    name: 'farmersList',
    waitOn: function() {
        var FARMERS_INCREMENT = 12;
        Session.set('itemsLimitFarmers', FARMERS_INCREMENT);
        Deps.autorun(function() {
            //console.log(Session.get('itemsLimitFarmers'));
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
