Farmers = new Mongo.Collection('farmers');

if(Meteor.isServer) {
    Meteor.publish('allFarmers', function() {
        return Farmers.find();
    });

    Meteor.publish('singleFarmer', function(userId, limit) {
        check(userId, String);
        check(limit, Number);
        return [
            Farmers.find(userId),
            Posts.find({farm: userId}, {sort: {joined: -1}, limit: limit})
        ];
    });

    Meteor.publish('limitFarmers', function(limit) {
        check(limit, Number);
        return Farmers.find({}, {sort: {joined: -1}, limit: limit});
    });

    Meteor.publish('editFarmer', function(userId) {
        check(userId, String);
        return [
            Farmers.find(userId),
            Posts.find({farm: userId})
        ]
    });
}

Farmers.allow({
    update: function(userId, farmer) { return ownsDocument(userId, farmer); },
    remove: function(userId, farmer) { return ownsDocument(userId, farmer); },
});

Farmers.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'name', 'city', 'state', 'description').length > 0);
    }
});

validateFarmer = function(farmer, type) {
    var errors = {};

    if(type === 'create')
    {
        //make sure this is user's one and only farm profile
        if(Meteor.user().farm) {
            errors.duplicate = "You already have a farm registered under this account";
            return errors;
        }
    }

    if(!farmer.name){
        errors.name = 'Please fill in a name for the farm';
    } else{
        //prevent identical farmers from being created
        var postWithSameLink = Farmers.findOne({name: farmer.name});
        if (postWithSameLink) {
            //generate error and do not submit
            errors.name = "Farm already exists with this name";
        }
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
       Meteor.users.update({_id: user._id}, {$set: {'farm': farmerId}});

       return{
           _id: farmerId
       }
   },

    removeFarmer: function(userId) {
        check(userId, String);
        Meteor.users.update({_id: Meteor.user()._id}, {$set: {'farm': null}}, function(error){
            if(error) {
                throw new Meteor.Error(error);
            }
            Farmers.remove(userId);
        });
    }
});