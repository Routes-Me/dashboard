import { diff } from "semver";
import { config } from "../constants/config";


export function convertHexToRGBint(hex) {
    return parseInt(hex.replace('#', ''), 16);
}

export function convertRGBintToHex(RGBint) {
    return '#' + RGBint?.toString(16);
}

export function convertObjectKeyToLowerCase(object) {
    var key, keys = Object.keys(object);
    var n = keys.length;
    var newobj = {}
    while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = object[key];
    }
    return newobj;
}

export function convertDateTimeToUnix(datetime) {
    return new Date(datetime).getTime() / 1000 //secs
}


export function convertUnixTimeToDateTime(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
}

export function convertUnixTimeToHours(unixTime) {

    const minutes = Math.floor(unixTime / 60);
    const hoursV = minutes > 60 ? Math.floor(minutes / 60) : 0;
    // const days = Math.floor(hoursV / 24);
    // console.log("hoursV ", hoursV);

    // const date = new Date(unixTime * 1000);
    // console.log(`Total :  UnixTime : ${unixTime} Date : ${date.toLocaleDateString()} Hours : ${date.getHours()}`);
    // const hours = date.getHours();
    return hoursV;
}


//The function checks for null values and removes the key
export function refineObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
            delete obj[propName];
        }
    }
    return obj
}

export function returnCampaignIds(campaigns) {
    let campaignIDList = [];
    campaigns.map(x => (campaignIDList.push(x.campaignId)));
    return campaignIDList;
}

export function validate(value) {
    return value === undefined ? ' -- ' : value === null ? ' -- ' : value === '' ? ' -- ' : value;
}

export function returnObjectForSelectedId(list, id) {
    let obj = '';
    if (list !== undefined) {
        obj = list.filter(x => x.institutionId === id)[0];
    }
    return obj;
}

export function returnEntityForInstitution(entity, role, user) {
    if (user?.institution?.institutionid !== undefined) {
        entity = user?.institution?.institutionid !== '' && isSU(role) ? entity : `institutions/${user.institution.institutionid}/${entity}`;
        return entity;
    }
    return entity;

}

export function isSU(role) {
    return role.privilege === config.SU ? true : false;
}

export function isROU(role) {
    return role.privilege === config.ROU ? true : false;
}


export function getCurrentDate() {

    let monthName = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0') - 1;
    //let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let mm = monthName[today.getMonth()];
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

function isProductionDomain(url) {
    //let domain = url.substring(url.indexOf('//'), url.indexOf('/'))
    let hostname = '';
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    return hostname === 'api.routesme.com' ? true : false
}

export function sortArrayOnKey(list, key, order) {
    return list.sort(dynamicSort(key, order))
}

function dynamicSort(property, sort) {
    var sortOrder = sort === config.sortOrder.ascending ? 1 : -1;
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}