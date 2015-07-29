Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    },
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Accounts.validateNewUser(function(user) {
   if(user.username && user.username.length > 3) {
        return true;
   }
    throw new Meteor.Error(403, "Username has to be longer than 3 characters");
});