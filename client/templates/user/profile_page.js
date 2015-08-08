Template.profilePage.helpers({
   activities: function() {
       console.log(Posts.find().count());
       return Posts.find();
   }
});