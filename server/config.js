//send verification email after user signs up
Meteor.users.after.insert(function (userId, doc) {
    Accounts.sendVerificationEmail(this._id);
    console.log('user inserted:' + this._id);
});
