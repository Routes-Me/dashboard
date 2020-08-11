﻿export const MockServerData = {

    VehicleMockServerData : {
        "vehiclesDetail": {
            "pagination": {
                "currentPage": 1,
                "totalCount": 2,
                "pageSize": 4,
                "totalPages": 1,
                "indexOne": 1,
                "indexTwo": 2,
                "showPrevious": false,
                "showFirst": false,
                "showLast": false
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
            
        }
        ,
        "status": true,
        "message": "Institutions data retrived successfully.",
        "responseCode": 200
    },

    InstitutionMockServerData :{
        "institutionDetails": {
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
                "institution": [
                    {
                        "institutionId": 3,
                        "name": "Nirmal Patel",
                        "createdAt": "2020-06-29T10:54:53",
                        "phoneNumber": 1234567890,
                        "countryIso": "IN"
                    },
                    {
                        "institutionId": 4,
                        "name": "vijay",
                        "createdAt": "2020-06-29T10:54:53",
                        "phoneNumber": 123123123,
                        "countryIso": "IN"
                    }
                ],
                "vehicles": null,
                "drivers": null
            }
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
    }





}