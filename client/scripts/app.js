/**
 * Created by Adina Paraschiv on 2/21/2017.
 */


//Creem aplicatia
angular.module("coderDojoTimisoara", [
    'ngRoute'
])
    .config(['$routeProvider', function($routeProvider){

        $routeProvider
            .when('/' + keys.despre, {templateUrl:'../views/despre.html'})
            .when('/' + keys.cumPotAjuta, {templateUrl:'../views/cum-pot-ajuta.html', controller: 'howMayIHelpController'})
            .when('/' + keys.login, {templateUrl:'../views/login.html'})
            .when('/' + keys.register, {templateUrl:'../views/register.html'})
            .when('/' + keys.editProfiles, {templateUrl:'../views/edit-profiles.html'})
            .when('/' + keys.myProfile, {templateUrl:'../views/my-profile.html'})
            .when('/' + keys.getDojosRoute, {templateUrl:'../views/inscrieri-saptamanale.html'})
            .when('/' + keys.getMyDojosRoute, {templateUrl:'../views/dojourile-mele.html'})
            .when('/' + keys.getDojoRoute, {templateUrl:'../views/view-dojo.html'})
            .when('/' + keys.addDojoRoute, {templateUrl:'../views/adauga-dojo.html'})
            .when('/' + keys.addBadgeLocation, {templateUrl:'../views/adauga-badge.html'})
            .when('/' + keys.cautaUnDojo, {templateUrl:'../views/cauta-un-dojo.html'})
            .when('/' + keys.viewEventLocation, {templateUrl:'../views/view-event.html'})
            .when('/' + keys.viewBadgesLocation, {templateUrl:'../views/vezi-toate-badgeurile.html'})
            .when('/' + keys.viewBadgeLocation, {templateUrl:'../views/view-badge.html'})
            .otherwise({redirectTo: '/despre'})
    }]);



const keys = {
    //Communication routes
    despre: 'despre',
    cumPotAjuta: "cum_pot_ajuta",
    login: 'login',
    logout: 'logout',
    register: 'register',
    editUser: 'editUser',
    editUsersChild: 'editUsersChild',
    myProfile: 'myProfile',
    editProfiles: 'editProfiles',
    getDojosRoute: 'getDojos',
    getMyDojosRoute: 'getMyDojos',
    getMyChildsDojosRoute: 'getMyChildsDojos',
    getDojoRoute: 'getDojo',
    getAuthDojoRoute: 'getAuthDojo',
    registerChildForDojo: 'registerChildForDojo',
    cancelChildRegistryForDojo: 'cancelChildRegistryForDojo',
    amIAuthenticatedUserRoute: 'amIAuthenticatedUserRoute',
    registerChildRoute: 'registerChildRoute',
    getChildrenRoute: 'getChildren',
    getUsersParentsRoute: 'getUsersParents',
    getChildsParentsRoute: 'getChildsParents',
    inviteUserToBeParentRoute: 'inviteUserToBeParent',
    getUsersNotificationsRoute: 'getUsersNotifications',
    getUsersChildNotificationsRoute: 'getUsersChildNotifications',
    deleteNotificationForUserRoute: 'deleteNotificationForUser',
    deleteNotificationForUsersChildRoute: 'deleteNotificationForUsersChild',
    acceptChildInviteRoute: 'acceptChildInvite',
    addDojoRoute: 'addDojo',
    deleteDojoRoute: 'deleteDojo',
    editDojoRoute: 'editDojo',
    cautaUnDojo: 'cautaUnDojo',
    becomeMemberOfDojoRoute: 'becomeMemberOfDojo',
    leaveDojoRoute: 'leaveDojo',
    getUsersForMember: 'getUsersForMember',
    getDetailedUserForMemberRoute: 'getDetailedUserForMember',
    acceptPendingMemberRoute: 'acceptPendingMember',
    rejectPendingMemberRoute: 'rejectPendingMember',
    uploadUserPictureRoute: 'uploadUserPicture',
    getAuthCurrentDojoEventsRoute: 'getAuthCurrentDojoEvents',
    getCurrentDojoEventsRoute: 'getCurrentDojoEvents',
    getAuthEventRoute: 'getAuthEvent',
    getEventRoute: 'getEvent',
    registerUserForEventRoute: 'registerUserForEvent',
    removeUserFromEventRoute: 'removeUserFromEvent',
    getUsersRegisteredForEventRoute: 'getUsersRegisteredForEvent',
    confirmOrRemoveUserFromEventRoute: 'confirmOrRemoveUserFromEvent',
    getNewNotificationsCountRoute: 'getNewNotificationsCount',
    addEventToDojoRoute: 'addEventToDojo',
    editEventOfDojoRoute: 'editEventOfDojo',
    getEventForEditingRoute: 'getEventForEditing',
    deleteEventRoute: 'deleteEvent',
    getUsersInvitedToEventRoute: 'getUsersInvitedToEvent',
    sendUserInvitesToEventRoute: 'sendUserInvitesToEvent',
    addBadgeRoute: 'addBadge',
    editBadgeRoute: 'goToEditBadge',
    getAllBadgesRoute: 'getAllBadges',
    getAuthAllBadgesRoute: 'getAuthAllBadges',
    getUsersBadgesRoute: 'getUsersBadges',
    getUsersChildsBadgesRoute: 'getUsersChildsBadges',
    uploadBadgePictureRoute: 'uploadBadgePicture',
    //TODO change the communication routes to view locations (for getDojo for ex)

    //View locations
    viewEventLocation: 'viewevent',
    addBadgeLocation: 'addBadge',
    viewBadgesLocation: 'viewBadgesLocation',
    viewBadgeLocation: 'viewBadgeLocation',

    //Notification types
    parentInviteNotification: 'parentInviteNotification',
    infoNotification: 'infoNotification',
    newNotificationCount: 'newNotificationCount',
    eventInviteNotification: 'eventInviteNotification',

    //Errors
    dbsUserCreationError: 'dbsUserCreationError',
    dbsUserSearchError: 'dbsUserSearchError',
    noMoreRoomInDojoError: 'noMoreRoomInDojoError',
    childAlreadyRegisteredError: 'childAlreadyRegisteredError',
    dojoNotFoundError: 'dojoNotFoundError',
    wrongUserError: 'wrongUserError',
    noChildrenError: 'noChildrenError',
    noParentsError: 'noParentsError',
    notAuthorizedError: 'notAuthorizedError',
    userAlreadyJoinedDojoError: 'userAlreadyJoinedDojoError',
    userAlreadyRegisteredForEventError: 'userAlreadyRegisteredForEvent',
    userNoLongerPartOfDojo: 'userNoLongerPartOfDojo',
    notSanitizedError: 'notSanitizedError',
    uploadPhotoError: 'uploadPhotoError',

    //Alerts
    childRegisterAlert: 'childRegisterAlert',
    savingUserErrorAlert: 'savingUserErrorAlert',
    infoAlert: 'infoAlert',
    errorAlert: 'errorAlert',

    //Information
    eventFilterRegisteredUsers: 'eventFilterRegisteredUsers',

    //User roles
    user: 'user',
    admin: 'admin',
    mentor: 'mentor',
    mentors: 'mentors',
    pendingMentor: 'pendingMentor',
    pendingMentors: 'pendingMentors',
    volunteer: 'volunteer',
    volunteers: 'volunteers',
    pendingVolunteer: 'pendingVolunteer',
    pendingVolunteers: 'pendingVolunteers',
    champion: 'champion',
    champions: 'champions',
    pendingChampion: 'pendingChampion',
    pendingChampions: 'pendingChampions',
    parent: 'parent',
    parents: 'parents',
    attendee: 'attendee',
    attendees: 'attendees',

    //Profile type
    editUserOver14Profile: 'editUserOver14Profile',     //Editing by the user himself/herself
    regChildUnder14Profile: 'regChildUnder14Profile',   //Registering by the parent
    regChildOver14Profile: 'regChildOver14Profile',     //Registering by the parent
    regUserOver14Profile: 'regUserOver14Profile',       //Registering by the user himself/herself

    //Views for users
    editUserProfile: 'editUserProfile',
    viewUserProfile: 'viewUserProfile',
    viewOtherParentProfile: 'viewOtherParentProfile',
    editChildUnder14Profile: 'editChildUnder14Profile', //Editing by the parent
    editChildOver14Profile: 'editChildOver14Profile',   //Editing by the parent
    viewUsersChildProfile: 'viewUsersChildProfile',
    addChildUnder14Profile: 'addChildUnder14Profile',
    addChildOver14Profile: 'addChildOver14Profile',
    showDojoInUserProfile: 'showDojoInUserProfile',
    showPasswords: 'showPasswords',
    showAlias: 'showAlias',
    showAddChildren: 'showAddChildren',
    showInviteParent: 'showInviteParent',
    hideEditButton: 'hideEditButton',
    uploadPhotoListenerInitiated: 'uploadPhotoListenerInitiated',

    //View for dojos
    viewMap: 'viewMap',
    viewList: 'viewList',
    viewDojo: 'viewDojo',
    editDojo: 'editDojo',
    addEventToDojo: 'addEventToDojo',
    viewMembers: 'viewMembers',
    memberType: {parents:'Parinti', attendees:'Copii', mentors:'Mentori', pendingMentors:'Mentori in asteptare',
        volunteers:'Voluntari', pendingVolunteers:'Voluntari  in asteptare', champions:'Campioni',
        pendingChampions:'Campioni in asteptare'},
    filterUsersValues: {
        name: 'name', nameUp: 'name-up', nameDown: 'name-down',
        nameWritten: 'name-written'
    },
    storedTypeOfUsers: 'storedTypeOfUsers',

    //View keys for various views
    showBackButton: 'showBackButton',
    showMapAndList: 'showMapAndList',

    //PermissionsForDojo
    canEditDojo: 'canEditDojo',
    canAcceptMembers: 'canAcceptMembers', //can add mentors, attendees, volunteers
    canAddEvent: 'canAddEvent',
    canDeleteDojo: 'canDeleteDojo',
    hasJoined: 'hasJoined',
    isPendingJoining: 'isPendingJoining',
    showMembers: 'showMembers', //can view mentors, attendees, volunteers

    //Views for events
    showMultiEventTypes: 'showMultiEventTypes',
    viewEvent: 'viewEvent',
    editEvent: 'editEvent',
    collapseTickets: 'collapseTickets',
    filterRegisteredEventUsers: 'filterRegisteredEventUsers',
    filterRegisteredEventUsersValues: {
        name: 'name', nameUp: 'name-up', nameDown: 'name-down',
        status: 'status', statusUp: 'status-up', statusDown:'status-down',
        role: 'role', roleUp: 'role-up', roleDown: 'role-down',
        nameWritten: 'name-written'
    },
    viewFilterPanel: 'viewFilterPanel',
    showInviteUsersPanel: 'showInviteUsersPanel',

    //Permissions for events
    canDeleteEvent: 'canDeleteEvent',
    canEditEvent: 'canEditEvent',
    canInviteUsersToEvent:'canInviteUsersToEvent',
    canSeeJoinedEventUsers: 'canSeeJoinedUsers',
    canConfirmEventUsers: 'canConfirmUsers',

    //Views for badges
    viewBadge: 'viewBadge',
    goToEditBadge: 'goToEditBadge',
    filterBadgesValues: {
        name: 'name', nameUp: 'name-up', nameDown: 'name-down',
        points: 'points', pointsUp: 'points-up', pointsDown:'points-down',
        nameWritten: 'name-written'
    },
    badgeEdited: 'badgeEdited',

    //Enums
    daysOfWeek: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbată'],
    daysOfWeekShort: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ'],
    typesOfTickets: ['voluntar', 'mentor', 'cursant'],
    eventTypesRecurrent: 'recurent',
    eventTypesUnique: 'unic',
    eventStatus: ['Activ', 'Inactiv'],
    months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie' , 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],


    //Key-values
    eventStatus_Confirmed:'Confirmat',
    eventStatus_Registered: 'Înscris',
    eventStatus_NotRegistered: "Neînscris",
    eventStatus_userNotLoggedIn: 'Not logged in',
    eventConfirmUser: 'confirm',
    eventRemoveUser: 'remove',
};



