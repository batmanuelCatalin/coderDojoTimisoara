/**
 * Created by catap_000 on 5/21/2017.
 */

const keys = require('../static_keys/project_keys');
const validator = require('validator');
const logger = require('winston');
const fs = require('fs');
//const mmm = require('mmmagic'), removed for enabling early deploy to azure
//    Magic = mmm.Magic;

module.exports.isActive = function(eventOrSession){
    if(eventOrSession.activeStatus === keys.eventStatus[0]){ //If the event is active
        return true;
    }
};

//Method for displaying user information for logging
module.exports.getUser = function(req){
    if(req.user){
        return `user=(email=${req.user.email}, alias=${req.user.alias}, _id=${req.user._id}, authorizationLevel=${req.user.authorizationLevel})`;
    } else {
        //This is the case where the user is given directly, not as a field of the res object
        return `user=(email=${req.email}, alias=${req.alias}, _id=${req._id}, ` +
            `authorizationLevel=${req.authorizationLevel})`;
    }
};

module.exports.isUserAdmin = function(user){
    return user.authorizationLevel === keys.admin;
};

let isUserVolunteerInDojo = module.exports.isUserVolunteerInDojo = function(dojo, userId){
    if(dojo.volunteers){
        return (dojo.volunteers.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.volunteers is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserPendingVolunteerInDojo = module.exports.isUserPendingVolunteerInDojo = function(dojo, userId){
    if(dojo.pendingVolunteers){
        return (dojo.pendingVolunteers.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.pendingVolunteers is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserAttendeeInDojo = module.exports.isUserAttendeeInDojo = function(dojo, userId){
    if(dojo.attendees){
        return (dojo.attendees.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.attendees is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserParentInDojo = module.exports.isUserParentInDojo = function(dojo, userId){
    if(dojo.parents){
        return (dojo.parents.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.parents is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserMentorInDojo = module.exports.isUserMentorInDojo = function(dojo, userId){
    if(dojo.mentors){
        return (dojo.mentors.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.mentors is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserPendingMentorInDojo = module.exports.isUserPendingMentorInDojo = function(dojo, userId){
    if(dojo.pendingMentors){
        return (dojo.pendingMentors.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.pendingMentors is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserChampionInDojo = module.exports.isUserChampionInDojo = function(dojo, userId){
    if(dojo.champions){
        return (dojo.champions.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.champion is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

let isUserPendingChampionInDojo = module.exports.isUserPendingChampionInDojo = function(dojo, userId){
    if(dojo.pendingChampions){
        return (dojo.pendingChampions.indexOf(userId.toString()) > -1);
    } else {
        logger.debug(`dojo.pendingChampions is not defined, dojo ${JSON.stringify(dojo)}`);
    }
};

module.exports.isUserBadgeGiverOfDojo = function(dojo, userId){
    return isUserMentorInDojo(dojo, userId) || isUserChampionInDojo(dojo, userId) || isUserVolunteerInDojo(dojo, userId);
};

let isUserMemberOfDojo = module.exports.isUserMemberOfDojo = function(dojo, userId){
    return isUserAttendeeInDojo(dojo, userId) || isUserMentorInDojo(dojo, userId) ||
        isUserChampionInDojo(dojo, userId) || isUserParentInDojo(dojo, userId) || isUserVolunteerInDojo(dojo, userId);
};

let isUserPendingMemberOfDojo = module.exports.isUserPendingMemberOfDojo = function(dojo, userId){
    return isUserPendingChampionInDojo(dojo, userId) || isUserPendingMentorInDojo(dojo, userId) ||
        isUserPendingVolunteerInDojo(dojo, userId);
};

module.exports.isUserMemberOrPendingMemberOfDojo = function(dojo, userId){
    return isUserMemberOfDojo(dojo, userId) || isUserPendingMemberOfDojo(dojo, userId);
};

//Method that returns true if the user is registered for an event as a mentor
module.exports.isUserMentorInEvent = function(event, userId){
    for(let i = 0; i < event.tickets.length; i++){
        let ticket = event.tickets[i];
        for(let j = 0; j < ticket.registeredMembers.length; j++){
            let regMember = ticket.registeredMembers[j];
            if(userId.toString() == regMember.userId){
                if(ticket.typeOfTicket === keys.typesOfTickets[1]){
                    return true;
                }
            }
        }
    }
};

//Method that returns true if the user is registered for an event as a volunteer
module.exports.isUserVolunteerInEvent = function(event, userId){
    for(let i = 0; i < event.tickets.length; i++){
        let ticket = event.tickets[i];
        for(let j = 0; j < ticket.registeredMembers.length; j++){
            let regMember = ticket.registeredMembers[j];
            if(userId.toString() == regMember.userId){
                if(ticket.typeOfTicket === keys.typesOfTickets[0]){
                    return true;
                }
            }
        }
    }
};

//Method for extracting a list of fields from a list of object (that have the fields)
module.exports.getListOfFieldsFromListOfObjects = function(list, field){
    let ret = [];
    list.forEach(function(item){
        ret.push(item[field]);
    });
    return ret;
};

//Method for determining if a child is the child of a user
//Arguments:
//     user is an object with a children list (_id's of the children)
//     child is an object with an _id field
module.exports.isUsersChild = function(user, child){
    //logger.silly('Entering isUsersChild');
    //logger.silly(`child_id=${child._id}`);
    if(user.children){
        //logger.silly(`user.children=${user.children}`);
        for(let i = 0; i < user.children.length; i++){
            let tmpChild = user.children[i];
            //logger.silly(`tmpChild=${tmpChild}`);
            if(tmpChild == child._id){//We need weak comparison because the two values are not of the same type
                return true;
            }
        }
    }
};

module.exports.makeInfoNotification = function(msg){
    let ret = {};
    ret.typeOfNot = keys.infoNotification;
    ret.data = {
        msg: msg
    };
    return ret;
};

module.exports.makeEventInviteNotification = function(data, roleInEvent){
    let ret = {};
    ret.typeOfNot = keys.eventInviteNotification;
    let msg = `Ai fost invitat in rolul de ${roleInEvent} la evenimentul ${data.eventName} de la dojo-ul ` +
              ` ${data.dojoName} din ${data.eventDate}.`;
    ret.data = {
        msg: msg,
        eventId: data.eventId
    };
    return ret;

};

//Returns the ticket the user is registered to
module.exports.getUsersTicketFromEvent = function(event, userId){
    for(let i = 0; i < event.tickets.length; i++){
        let ticket = event.tickets[i];
        for(let j = 0; j < ticket.registeredMembers.length; j++){
            let regMember = ticket.registeredMembers[j];
            if(regMember.userId == userId){
                return ticket;
            }
        }
    }
};

module.exports.getPrettyHoursAndMinutes = function(date){
    return date.getHours() + ':' + adjustOneNumberMinutes('' + date.getMinutes())
};

//Method for adding a 0 if the minutes are just one number (eg 2 to display 02)
function adjustOneNumberMinutes(number){
    return number.length == 1 ? '0' + number : number;
}

module.exports.areDojosEqual = function(dojo, sanitizedDojo){
    if(dojo.name != sanitizedDojo.name ||
        dojo.address != sanitizedDojo.address ||
        dojo.latitude != sanitizedDojo.latitude ||
        dojo.longitude != sanitizedDojo.longitude ||
        dojo.email != sanitizedDojo.email ||
        dojo.facebook != sanitizedDojo.facebook ||
        dojo.twitter != sanitizedDojo.twitter){
        return false;
    }

    for(let i = 0; i < dojo.requirements.length; i++){
        if(dojo.requirements[i] != sanitizedDojo.requirements[i]){
            return false;
        }
    }

    for(let i = 0; i < dojo.statuses.length; i++){
        if(dojo.statuses[i] != sanitizedDojo.statuses[i]){
            return false;
        }
    }

    for(let i = 0; i < dojo.recurrentEvents.length; i++){
        if(!areEventsEqual(dojo.recurrentEvents[i], sanitizedDojo.recurrentEvents[i])){
            return false;
        }
    }
    return true;
};

let areEventsEqual = module.exports.areEventsEqual = function(event, sanitEvent){
    if(event.startHour != sanitEvent.startHour ||
        event.endHour != sanitEvent.endHour ||
        event.startMinute != sanitEvent.startMinute ||
        event.endMinute != sanitEvent.endMinute ||
        event.day != sanitEvent.day ||
        event.name != sanitEvent.name ||
        event.description != sanitEvent.description ||
        event.activeStatus != sanitEvent.activeStatus){
        return false;
    }

    for(let j = 0; j < event.sessions.length; j++){
        let session = event.sessions[j];
        let sanitSession = sanitEvent.sessions[j];
        if(session.workshop != sanitSession.workshop){
            return false;
        }

        for(let k = 0; k < session.tickets.length; k++){
            let ticket = session.tickets[k];
            let sanitTicket = sanitSession.tickets[k];
            if(ticket.typeOfTicket != sanitTicket.typeOfTicket ||
                ticket.nameOfTicket != sanitTicket.nameOfTicket){
                return false;
            }
        }
    }
    return true;
};

//Sanitization values
//Characters allowed for dojo events TODO find a place for this info
const eventWhiteListNames = module.exports.eventWhiteListNames =  'aăâbcdefghiîjklmnopqrsștțuvwxyzAĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ1234567890.,@!/?\\-+: ';
const phoneWhiteList = module.exports.phoneWhiteList = '+0123456789 ';
const userNameWhitelist = module.exports.userNameWhitelist = 'aăâbcdefghiîjklmnopqrsștțuvwxyzAĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ';
const linkWhiteList = module.exports.linkWhiteList = eventWhiteListNames + '=';

module.exports.sanitizeEvents = function(events){
    //cloning the events
    let ret = JSON.parse(JSON.stringify(events));
    for(let i = 0; i < ret.length; i++){
        ret[i] = sanitizeEvent(ret[i]);
    }
    return ret;
};

//Method for sanitizing every field from an event
let sanitizeEvent = module.exports.sanitizeEvent = function(event){
    //clone the event
    event = JSON.parse(JSON.stringify(event));
    //Sanitizing the event name
    let eventName = event.name;
    let sanitEventName = validator.trim(eventName);
    if(sanitEventName.length > 50){
        sanitEventName = sanitEventName.substring(0, 50);
    }
    sanitEventName = validator.whitelist(sanitEventName, eventWhiteListNames);
    event.name = sanitEventName;

    //Sanitizing the event description
    let eventDescr = event.description;
    let sanitEventDescr = validator.trim(eventDescr);
    if(sanitEventDescr.length > 300){
        sanitEventDescr = sanitEventDescr.substring(0, 300);
    }
    event.description = validator.whitelist(sanitEventDescr, eventWhiteListNames);
    for(let j = 0; j < event.sessions.length; j++){
        let session = event.sessions[j];
        //Sanitizing session workshop
        let sessionWorkshop = session.workshop;
        let sanitWorkshop = validator.trim(sessionWorkshop);
        if(sanitWorkshop.length > 100){
            sanitWorkshop = sanitWorkshop.substring(0, 100);
        }
        sanitWorkshop = validator.whitelist(sanitWorkshop, eventWhiteListNames);
        session.workshop = sanitWorkshop;

        //Sanitizing the tickets
        for(let k = 0; k < session.tickets.length; k++){
            let ticket = session.tickets[k];
            //Sanitizing ticket name
            let ticketName = ticket.nameOfTicket;
            let sanitTicketName = validator.trim(ticketName);
            if(sanitTicketName.length > 50){
                sanitTicketName = sanitTicketName.substring(0, 100);
            }
            sanitTicketName = validator.whitelist(sanitTicketName, eventWhiteListNames);
            ticket.nameOfTicket = sanitTicketName;

            //Sanitizing ticket number
            ticket.numOfTickets = Math.floor(ticket.numOfTickets);
        }
    }
    return event;
};

//Method that converts and event received from the client (when adding events or editing events), and converts
// it to a form that events are stored in the database (ticket based instead of session based).
// clientEvent is an event object with the client format
// dojoId is a String representation of the ObjectId
module.exports.convertClientEventToUniqueEvent = function(clientEvent, dojoId){
    logger.debug(`Entering convertClientEventToUniqueEvent`);
    let event = {};
    event._id = clientEvent._id;
    event.name = clientEvent.name;
    event.description = clientEvent.description;
    event.activeStatus = clientEvent.activeStatus;


    let startTime = new Date(clientEvent.day);
    startTime.setHours(clientEvent.startHour);
    startTime.setMinutes(clientEvent.startMinute);

    let endTime = new Date(clientEvent.day);
    endTime.setHours(clientEvent.endHour);
    endTime.setMinutes(clientEvent.endMinute);

    event.startTime = startTime;
    event.endTime = endTime;
    event.dojoId = dojoId;
    event.tickets = convertEventSessionsToTickets(clientEvent.sessions);
    return event;
};

//Method that converts a list of sessions from the recurrent event to a list of tickets for the actual events
let convertEventSessionsToTickets =  module.exports.convertEventSessionsToTickets = function(eventSessions){
    let ret = [];
    eventSessions.forEach(function(session){
        let sessionId = session._id;
        //Events received from the gui sometimes (if you edit unique events) do not have a session _id so we need to
        //create one (this is also done on the client, but in case it is missing)
        if(!sessionId){
            sessionId = Date.now() + '' + Math.floor((Math.random() * 10000000) + 1);
        }
        if(module.exports.isActive(session)){
            session.tickets.forEach(function(ticket){
                let cloneTicket = {};
                cloneTicket.registeredMembers = [];
                cloneTicket.workshop = session.workshop;
                cloneTicket.sessionId = sessionId;
                cloneTicket.nameOfTicket = ticket.nameOfTicket;
                cloneTicket.numOfTickets = ticket.numOfTickets;
                cloneTicket.activeStatus = ticket.activeStatus;
                cloneTicket.typeOfTicket = ticket.typeOfTicket;
                cloneTicket._id = ticket._id;
                ret.push(cloneTicket);
            });

        }
    });
    return ret;
};

//Method that removes the field with the registered members from the event tickets
module.exports.removeRegisteredUserFromDataBaseEvent = function(event){
    event.tickets.forEach(function(ticket){
        ticket.registeredMembers = undefined;
    });
    return event;
};

module.exports.sanitizeSpecialEvent = function(specialEvent){
    //we clone the special event
    specialEvent = JSON.parse(JSON.stringify(specialEvent));

    //Sanitizing the event name
    let eventName = specialEvent.name;
    let sanitEventName = validator.trim(eventName);
    if(sanitEventName.length > 100){
        sanitEventName = sanitEventName.substring(0, 100);
    }
    sanitEventName = validator.whitelist(sanitEventName, eventWhiteListNames);
    specialEvent.name = sanitEventName;

    let eventDescription = specialEvent.description;
    let sanitDescription = validator.trim(eventDescription);
    if(sanitDescription.length > 400){
        sanitDescription = sanitDescription.substring(0, 400);
    }
    sanitDescription = validator.whitelist(sanitDescription, eventWhiteListNames);
    specialEvent.description = sanitDescription;

    let eventAddress = specialEvent.address;
    let sanitAddress = validator.trim(eventAddress);
    if(sanitAddress.length > 200){
        sanitAddress = sanitAddress.substring(0, 200);
    }
    sanitAddress = validator.whitelist(sanitAddress, eventWhiteListNames);
    specialEvent.address = sanitAddress;

    let eventCity = specialEvent.city;
    let sanitCity = validator.trim(eventCity);
    sanitCity = validator.whitelist(sanitCity, eventWhiteListNames);
    specialEvent.city = sanitCity;

    let eventLatitude = specialEvent.latitude;
    if(isNaN(eventLatitude)){
        specialEvent.latitude = undefined;
    }

    let eventLongitude = specialEvent.longitude;
    if(isNaN(eventLongitude)){
        specialEvent.longitude = undefined;
    }

    let eventStartHour = specialEvent.startHour;
    if(isNaN(eventStartHour)){
        specialEvent.startHour = undefined;
    }

    let eventEndHour = specialEvent.endHour;
    if(isNaN(eventEndHour)){
        specialEvent.endHour = undefined;
    }

    let eventStartMinute = specialEvent.startMinute;
    if(isNaN(eventStartMinute)){
        specialEvent.startMinute = undefined;
    }

    let eventEndMinute = specialEvent.endMinute;
    if(isNaN(eventEndMinute)){
        specialEvent.endMinute = undefined;
    }

    let eventStartDay = specialEvent.startDay;
    if(!isDate(eventStartDay)){
        specialEvent.startDay = undefined;
    }

    let eventEndDay = specialEvent.endDay;
    if(!isDate(eventEndDay)){
        specialEvent.endDay = undefined;
    }

    return specialEvent;
};

module.exports.areSpecialEventsEqual = function(specialEvent1, specialEvent2){
    if(specialEvent1.startHour != specialEvent2.startHour ||
        specialEvent1.endHour != specialEvent2.endHour ||
        specialEvent1.startMinute != specialEvent2.startMinute ||
        specialEvent1.endMinute != specialEvent2.endMinute ||
        specialEvent1.startDay != specialEvent2.startDay ||
        specialEvent1.endDay != specialEvent2.endDay ||
        specialEvent1.name != specialEvent2.name ||
        specialEvent1.description != specialEvent2.description ||
        specialEvent1.address != specialEvent2.address ||
        specialEvent1.latitude != specialEvent2.latitude ||
        specialEvent1.longitude != specialEvent2.longitude ||
        specialEvent1.city != specialEvent2.city){
        return false;
    } else {
        return true;
    }
};

let isDate = module.exports.isDate = function(str) {
    return !isNaN(Date.parse(str));
};

//Method that weakly compares (ObjectId and String will be equal) 2 user's ids
module.exports.isSameUser = function(user1, user2){
    return user1._id == user2._id;
};


module.exports.deletePhoto = function(filename){
    fs.unlink(filename, function(err){
        if(err){
           return logger.error(`Error deleting file ${filename}:` + err);
        }
        logger.debug(`Deleted file ${filename}`);
    });
};

module.exports.removeWhiteSpaces = function(string){
    return string.replace(/\s/g, '');
};

module.exports.inspectUploadedImage = function(file, relativePath, callback){
    //Commented because mmagic could not be installed in azure (just to see the server running)
    //var magic = new Magic(mmm.MAGIC_MIME_TYPE);
    //magic.detectFile(relativePath + file.filename, function(err, result) {
    //   if(err){
    //       callback(err);
    //   } else {
    //       let fileInspect = {};
    //       fileInspect.fileSize = file.size;
    //       fileInspect.mimeType = result;
    //       callback(null, fileInspect);
    //  }
    //});

    let fileInspect = {};
    fileInspect.fileSize = file.size;
    fileInspect.mimeType = 'image/jpeg';
    callback(null, fileInspect);


};