export const MockServerData = {

    VehicleMockServerData : {
        "vehiclesDetail": {
            "pagination": {

                "offset": 20,
                "limit": 10,
                "total": 3465,

            },
            "data": {
                "vehicles": [
                    {
                        "vehicleId": 6,
                        "deviceId": 1,
                        "plateNumber": "4444",
                        "institutionId": 3,
                        "modelYear": 2020,
                        "modelId": 2
                    },
                    {
                        "vehicleId": 7,
                        "deviceId": 1,
                        "plateNumber": "00078",
                        "institutionId": 3,
                        "modelYear": 2020,
                        "modelId": 2
                    }
                ],
                "devices": null,
                "drivers": null,
            },
                "include": {
                    "institutions":
                        [
                            {
                                "institutionId": 3,
                                "name": "Nirmal Patel",
                                "createdAt": "2020-06-29T10:54:53",
                                "phoneNumber": 1234567890,
                                "countryIso": "IN"
                            }
                        ],
                    "models":
                        [
                            {
                                "modelId": 2,
                                "name": "A3"
                            }
                        ]
                }
            
        }
        ,
        "status": true,
        "message": "Institutions data retrived successfully.",
        "responseCode": 200
    },

    institutionDetails :{
        "pagination": {

            "offset": 0,
            "limit": 2,
            "total": 2

        },
        "data": {
           "institutions": [
                    {
                        "institutionId": 3,
                        "name": "Nirmal Patel",
                        "createdAt": "2020-06-29T10:54:53",
                        "phoneNumber": 1234567890,
                        "countryIso": "IN",
                        "services":[1,]
                    },
                    {
                        "institutionId": 4,
                        "name": "vijay",
                        "createdAt": "2020-06-29T10:54:53",
                        "phoneNumber": 123123123,
                        "countryIso": "IN",
                        "services": [1, 2]
                    }
           ],
                "vehicles": null,
                "drivers": null
        },
        "include": {
            "services": [
                {
                    "id": 1,
                    "name": "Advertiser"
                },
                {
                    "id": 2,
                    "name": "Taxi Operator"
                }
            ]
        },
        "status": true,
        "message": "Institutions data retrived successfully.",
        "responseCode": 200
    },

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


    UsersMockServerData: {

        "pagination": {

            "offset": 20,
            "limit": 10,
            "total": 3465

        },
        "data": {
            "users": [
                {
                    "userId": 3,
                    "email": "vijayparmar3267@gmail.com",
                    "phone": "9624931991",
                    "password": null,
                    "createdDate": "2020-07-18T07:37:03",
                    "isVerified": false,
                    "lastLoginDate": null,
                    "application": "dashboard",
                    "name": "manager",
                    "description": "manager"
                },
                {
                    "userId": 4,
                    "email": "parmarvijay267@gmail.com",
                    "phone": "9624931991",
                    "password": null,
                    "createdDate": "2020-07-21T10:24:39",
                    "isVerified": false,
                    "lastLoginDate": null,
                    "application": "dashboard",
                    "name": "manager",
                    "description": "manager"
                }
            ]
        },
        "status": true,
        "message": "Users data retrived successfully.",
        "responseCode": 200

    },

    ServicesMockServerData: {

        "pagination": {

            "offset": 20,
            "limit": 10,
            "total": 3465

        },
        "data": {
            "services":[
                {
                    "id": 1,
                    "name":"Advertiser"
                },
                {
                    "id": 2,
                    "name": "Taxi Operator"
                }
            ]
        },
        "status": true,
        "message": "Users data retrived successfully.",
        "responseCode": 200
    }


}