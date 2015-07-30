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
