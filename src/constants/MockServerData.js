export const MockServerData = {

    ModelMockServerData : {
        "manuFacturersDetails": {
            "pagination": {
                "currentPage": 1,
                "totalCount": 1,
                "pageSize": 10,
                "totalPages": 1,
                "indexOne": 1,
                "indexTwo": 1,
                "showPrevious": false,
                "showFirst": false,
                "showLast": false
            },
            "data": {
                "carManuFacturers": null,
                "carModels": [
                    {
                        "modelId": 2,
                        "name": "A3"
                    }
                ]
            }
        },
        "status": true,
        "message": "Models data retrived successfully.",
        "responseCode": 200
    },

    MakeDetails: {
        "pagination": {

            "offset": 1,
            "limit": 10,
            "total": 2

        },
        "data": {
            "makes": [
                {
                    "id": 1,
                    "name": "Audi"
                },
                {
                    "id": 2,
                    "name": "KIA"
                },
                {
                    "id": 3,
                    "name": "BMW"
                }
            ]
        },
        "status": true,
        "message": "Models data retrived successfully.",
        "responseCode": 200
    },


    ModelDetails: {
        "pagination": {

            "offset": 1,
            "limit": 10,
            "total": 2

        },
        "data": {
            "models": [
                {
                    "id": 1,
                    "name": "A3",
                    "makeId":1
                },
                {
                    "id": 2,
                    "name": "Q7",
                    "makeId":1
                },
                {
                    "id": 3,
                    "name": "X6",
                    "makeId":3
                }
            ]
        },
        "status": true,
        "message": "Models data retrived successfully.",
        "responseCode": 200
    },

    NavMenuItems : {

        "data":[
            {
                "roleId":1,
                "navItems":["Tracking","Users","Vehicles","Advertisements","Institutions"]
            },
            {
                "roleId":2,
                "navItems":["Tracking","Users","Vehicles","Advertisements"]
            }
        ]
    },


    Applications : {
        data : [ 
            {
                "id":"",
                "value":"select an application"
            },
            {
                "id"    : "screen",
                "value" : "screen" 
            },
            {
                "id"    :"driver",
                "value" :"driver" 
            },
            {
                "id":1,
                "value":"dashboard"
            },
            {
                "id":"userapp",
                "value":"userapp"
            }
        ]
    },

    Priviledges : {
        data: [
            {
                "id":"",
                "value":"select a role"
            },
        {
            "id"    :"chife",
            "value" :"chife" 
        },
        {
            "id"    : 1,
            "value" : "super" 
        },
        {
            "id"   :"employee",
            "value":"employee"
        },
        {
            "id"   :"user",
            "value":"user"
        }
      ]
    },

    Institutions :{
        data: [
            {
                "id":"",
                "value":"select an institution"
            },
            {
                "id": 1,
                "value": "Routes"
            }
        ]
    },

    Services:{
        data:[
            {
                "id":"1",
                "value": "Advertisor"
            },
            {
                "id":"2",
                "value":"Taxi Operator"
            }
        ]
    }


}