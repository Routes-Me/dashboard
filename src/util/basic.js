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
    const date = new Date(unixTime * 1000);
    const hours = date.getHours();
    if (hours > 24)
        return `${hours / 24} days ${hours % 24} hrs`;
    return `${hours} hrs`;
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