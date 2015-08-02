Farmers = new Mongo.Collection('farmers');

if(Meteor.isServer) {
    Meteor.publish('allFarmers', function() {
        return Farmers.find();
    });

    Meteor.publish('singleFarmer', function(userId) {
        check(userId, String);
        return Farmers.find(userId);
    });

    Meteor.publish('limitFarmers', function(limit) {
        check(limit, Number);
        return Farmers.find({}, {sort: {joined: -1}, limit: limit});
    });
}

validateFarmer = function(farmer) {
    errors = {}
    if(!farmer.name){
        errors.name = 'Please fill in a name for the farm';
    }
    if(!farmer.city){
        errors.city = "Please fill in the city location of the farm";
    }
    if(!farmer.state){
        errors.state = "Please fill in state location of the farm";
    }
    if(!farmer.description){
        errors.description = "Please include some information about your farm! It helps inform customers about what you guys are all about!"
    }
    return errors;
};

Meteor.methods({
   farmerInsert: function(postAttributes) {
       check(Meteor.userId(), String);
       check(postAttributes, {
           name: String,
           city: String,
           state: String,
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

       var errors = validateFarmer(farmer);
       if(errors.name || errors.state || errors.city || errors.description) {
           throw new Meteor.Error('invalid post', 'did not set at least one attribute');
       }

       var farmerId = Farmers.insert(farmer);
       return{
           _id: farmerId
       }
   }
});