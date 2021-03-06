/**
 * Created by Adina Paraschiv on 3/4/2017.
 */

'use strict';
const mongoose = require('mongoose');
const keys = require('../static_keys/project_keys');
const logger = require('winston');
const event = require('./eventModel');

let DojoSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    address: String,
    latitude: Number,
    longitude: Number,
    email: String,
    statuses: [String],
    facebook: String,
    twitter: String,
    requirements: [String],
    champions:[String],
    pendingChampions:[String],
    mentors: [String],
    pendingMentors:[String],
    volunteers: [String],
    pendingVolunteers:[String],
    attendees:[String],
    parents:[String],
    recurrentEvents: [event.recurrentEventSchema],
    pictureUrl: String
});


// Here we export the DataBase interface to our other modules
let Dojo = module.exports = mongoose.model("Dojo", DojoSchema);

let dojosFields = {
    name: true,
    latitude: true,
    longitude: true
};

//This are are basic dojo information, to show it on a map and a name for the dojo.
module.exports.getDojos = function(callback){
    Dojo.find({}, callback);
};

let dojoFields = {
    name: true,
    address: true,
    latitude: true,
    longitude: true,
    email: true,
    statuses: true,
    schedules: true,
    facebook: true,
    twitter: true,
    requirements: true,
    dojoEvents: true,
    pictureUrl: true,
    recurrentEvents: true
};

//This are dojos for users that ARE NOT authenticated
module.exports.getDojo = function(dojoId, callback){
    Dojo.findOne({_id: dojoId},
        dojoFields, //Filter for dojo fields
        function(err, dojo){
            if(err){
                callback(err);
            } else {
                callback(null, dojo);
            }
        });
};


let dojoAuthFields = {
    name: true,
    address: true,
    latitude: true,
    longitude: true,
    email: true,
    statuses: true,
    schedules: true,
    facebook: true,
    twitter: true,
    requirements: true,
    champions:true,
    pendingChampions:true,
    mentors: true,
    pendingMentors:true,
    volunteers: true,
    pendingVolunteers:true,
    attendees:true,
    parents: true,
    dojoEvents: true,
    pictureUrl: true,
    recurrentEvents: true
};

//This are dojos for users that ARE authenticated
module.exports.getAuthDojo = function(dojoId, callback){
    Dojo.findOne({_id: dojoId},
        dojoAuthFields, //Filter for dojo fields
        function(err, dojo){
            if(err){
                callback(err);
            } else {
                callback(null, dojo);
            }
        });
};

let fieldsForInternalDojoAuthentication = {
    champions:true,
    pendingChampions:true,
    mentors: true,
    pendingMentors:true,
    volunteers: true,
    pendingVolunteers:true,
    attendees:true,
    parents: true
};

//This method retrieves a dojos used for internal app verifications, the fields retrieved are mentioned above
module.exports.getDojoForInternalAuthentication = function(dojoId, callback){
    Dojo.findOne({_id: dojoId}, fieldsForInternalDojoAuthentication, callback);
};

//This method retrieves a dojos used for internal app verifications, the fields retrieved are mentioned above
module.exports.getDojoForChampionAuthentification = function(dojoId, callback){
    Dojo.findOne({_id: dojoId}, {champions:true}, callback);
};

//We only modify the fields that can be edited
module.exports.updateDojo = function(dojo, callback){
    Dojo.findOneAndUpdate({_id:dojo._id},
        {$set: {name: dojo.name, address: dojo.address, latitude: dojo.latitude, longitude: dojo.longitude, email: dojo.email,
            statuses: dojo.statuses, schedules: dojo.schedules, facebook: dojo.facebook, twitter: dojo.twitter,
            requirements: dojo.requirements, recurrentEvents: dojo.recurrentEvents}},
        {new:true},
        function(err, dojo){
            logger.silly(`Updated dojo: ${JSON.stringify(dojo)}`);
            callback(err);
        })
};

//Method for retrieving the dojos that have recurrent events
module.exports.findDojosWithRecurrentEvents = function(callback){
    Dojo.find({recurrentEvents: {$exists: true, $ne:[]}}, {recurrentEvents: true, name: true}, callback);
};


let fieldsForFindDojoForAuthEvent = {
    champions:true,
    mentors: true,
    volunteers: true,
    attendees:true,
    parents: true
};
//Method for getting a dojo for use in preparing authenticated events
module.exports.findDojoForAuthEvent = function(dojoId, callback){
    Dojo.findOne({_id:dojoId}, fieldsForFindDojoForAuthEvent, callback);
};

//Method for adding user's children to the dojo the user just joined
module.exports.addUsersChildrenToDojo = function(usersChildren, dojoId, callback){
    Dojo.findOneAndUpdate({_id:dojoId}, {$addToSet : {attendees : {$each:usersChildren}}}, callback);
};

//Method for adding user's children to the user's dojos
module.exports.addUsersChildToUsersDojos = function(childId, dojos, callback){
    Dojo.updateMany({_id: {$in:dojos}}, {$addToSet : {attendees : childId}}, callback);
};

module.exports.getDojoMembersForInvitingToEvent = function(dojoId, membersToGet, callback){
    Dojo.findOne({_id: dojoId}, membersToGet, callback);
};


let fieldsForUsersDojos = {name: true};
module.exports.getUsersDojos = function(userId, callback){
    Dojo.find({$or: [{mentors:userId}, {champions: userId}, {volunteers: userId}, {parents: userId}, {attendees: userId}]},
        fieldsForUsersDojos, callback);
};

//THe userId is unnecessary, but we use it for allowing the this function to be swapped with the one above
module.exports.getAdminsDojos = function(userId, callback){
    Dojo.find({}, fieldsForUsersDojos, callback);
};

//Method for getting dojo names
module.exports.getDojoNames = function(dojos, callback){
    Dojo.find({_id: {$in:dojos}}, {name: true}, callback);
};
