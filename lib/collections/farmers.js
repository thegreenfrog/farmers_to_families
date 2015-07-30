Farmers = new Mongo.Collection('farmers');

if(Meteor.isServer) {
    Meteor.publish('allFarmers', function() {
        return Farmers.find();
    });
}

Meteor.methods({
   farmerInsert: function(postAttributes) {
       check(Meteor.userId(), String);
       check(postAttributes, {
           name: String,
           location: String,
           description: String
       });

       //prevent identical farmers from being created
       var postWithSameLink = Farmers.findOne({name: postAttributes.name});
       if (postWithSameLink) {
           return {
               postExists: true,
               _id: postWithSameLink._id
           }
       }

       var user = Meteor.user();

       var farmer = _.extend(postAttributes, {
           userId: user._id,
           author: user.username,
           joined: new Date()
       });

       var farmerId = Farmers.insert(farmer);
       return{
           _id: farmerId
       }
   }
});