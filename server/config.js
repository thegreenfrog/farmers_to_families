Meteor.startup(function() {
    if (Posts.find().count() === 0) {
        Posts.insert({
            produce: 'Kale',
            price: '4.99',
            author: 'basicFarms',
            joined: new Date()
        });

        Posts.insert({
            produce: 'Bananas',
            price: '0.99',
            author: 'Chiquita',
            joined: new Date()
        });

        var now = new Date().getTime();
        for (var i = 0; i < 30; i++) {
            Farmers.insert({
                name: 'Farm' + i,
                city: 'Brunswick',
                state: 'Maine',
                description: 'Farm in Maine',
                author: 'McGregor Farms',
                userId: '12839HDKS',
                joined: new Date(now - i * 3600 * 1000)
            });
        }
    }

    //setup signup email notification service
    Accounts.emailTemplates.siteName = 'Farmers to Families';
    Accounts.emailTemplates.verifyEmail.subject = function(user) {
        return 'Confirm Your Email Address';
    };
    Accounts.emailTemplates.verifyEmail.text = function(user, url) {
        return 'click on the following link to verify your email address: ' + url;
    };
});


Meteor.users.after.insert(function (userId, doc) {
    Accounts.sendVerificationEmail(this._id);
    console.log('user inserted:' + this._id);
});
