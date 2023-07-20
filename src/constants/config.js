export const config = {

    onlineVehicles: "Online Vehicles",
    offlineVehicles: "Offline Vehicles",

    selectService: {
        serviceId: 0,
        name: "Please select a service"
    },

    selectModel: {
        modelId: 0,
        name: "Please select a model"
    },

    selectMake: {
        manufacturerId: 0,
        name: "Please select a make"
    },

    selectApplication: {
        applicationId: 0,
        name: "Please select an application"
    },

    selectPrivilege: {
        privilegeId: 0,
        name: "Please select a privilege"
    },

    selectInstitution: {
        institutionId: 0,
        name: "Please select the institution"
    },

    selectDayInterval: {
        intervalId: 0,
        title: "Please select a interval"
    },

    sortOrder: {
        ascending: "asc",
        descending: "desc"
    },

    analytics: {
        qrScans: "linklogs",
        playBack: "playbacks",
        category: [{
            "id": 1,
            "name": "playbacks",
            "options": [
                { "name": "Android", "color": "#a4c639" },
                { "name": "iOS", "color": "#a2aaad" },
                { "name": "web", "color": "#375a9b" },
                { "name": "Windows", "color": "#9b7837" },
                { "name": "Mac", "color": "#90a3c4" }
            ]
        },
        {
            "id": 2,
            "name": "linklogs",
            "options": [
                { "name": "Morning", "color": "#a4c639" },
                { "name": "Noon", "color": "#a2aaad" },
                { "name": "Evening", "color": "#375a9b" },
                { "name": "Night", "color": "#9b7837" }
            ]
        }
        ]
    },


    NavMenuItems: {
        "data": [
            {
                "roleId": 1,
                "navItems": ['Tracking', 'Users', 'Vehicles','Drivers', 'Advertisements', 'Institutions', 'Access Control', 'Campaigns', 'Analytics', 'Prizes', 'EMM', 'Bus Routes']
            },
            {
                "roleId": 2,
                "navItems": ["Tracking", "Vehicles"]
            }
        ]
    },

    SU: "super",
    ROU: "support",

    refreshTokenURL: 'authentications/renewals',
    authenticationURL: 'authentications',

    Pagelimit: 20,
    DropDownLimit: 5,
    MaxLimit: 100,
    Version: 'DVS21032021',

    OnlineLog: 'checkins',
    OfflineLog: 'checkins/offline-vehicles'



};
