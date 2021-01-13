export const config = {

    selectService : {
        serviceId : 0,
        name : "Please select a service"
    },

    selectModel :{
        modelId: 0,
        name: "Please select a model"
    },

    selectMake :{
        manufacturerId: 0,
        name: "Please select a make"
    },

    selectApplication:{
            applicationId: 0,
            name: "Please select an application"
        },

    selectPrivilege:{
        privilegeId: 0,
        name: "Please select a privilege"
    },

    selectInstitution:{
        institutionId:0,
        name: "Please select the institution"
    },

    selectDayInterval:{
        intervalId:0,
        title:"Please select a interval"
    },

    NavMenuItems : {
        "data":[
            {
                "roleId":1,
                "navItems":["Tracking","Users","Vehicles","Advertisements","Institutions","Access Control",'Campaigns','Analytics','Prizes']
            },
            {
                "roleId":2,
                "navItems":["Tracking","Users","Vehicles"]
            }
        ]
    },

    StageSuperInstitution : '78132467',
    SuperInstitution      : '1580030173', // 1580030173 78132467
    
    Domain:'http://api.routesme.com/api/',

    // Domain:  'http://stage.api.routesme.com/api/', //'http://vmtprojectstage.uaenorth.cloudapp.azure.com:5000/api/',

    Pagelimit : 20,
    DropDownLimit : 5,
    Version : 'VS12012021'

};