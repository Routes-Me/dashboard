import { config } from "../constants/config";


export function convertHexToRGBint(hex){
    return parseInt(hex.replace('#',''),16);
}

export function convertRGBintToHex(RGBint){
    return '#'+RGBint?.toString(16);
}

export function returnCampaignIds(campaigns)
{
    let campaignIDList =[];
    campaigns.map(x => (campaignIDList.push(x.campaignId)));
    return campaignIDList;
}

export function validate(value)
{
    return value === null ? '--' : value;
}

export function returnObjectForSelectedId(list, id){
    let obj = '';
    if(list !== undefined){
        obj = list.filter(x => x.institutionId === id)[0];
    }
    return obj;
}

export function returnEntityForInstitution(entity,user)
{
    if(user?.InstitutionId !== undefined)
    {
        return user.InstitutionId !== '' && isSU(user) ?  entity : `institutions/${user.InstitutionId}/${entity}`;  
    }
    return entity;

}

export function isSU(user){

    let role = user.Roles;

    return role.includes(process.env.REACT_APP_SUPERUSER) || role.includes(process.env.REACT_APP_SUPPORTUSER) ? true : false ;

    // let currentDomain = config.Domain;
    // let superInstitution = isProductionDomain(currentDomain)? config.SuperInstitution : config.StageSuperInstitution 
    // return user.InstitutionId === superInstitution ? true : false // 1580030173 78132467
}

export function isROU(user){
    let role = user.Roles;
    return role.includes(process.env.REACT_APP_SUPPORTUSER) ? true : false;
}


export function getCurrentDate(){

    let monthName = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')-1;
    //let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let mm = monthName[today.getMonth()];
    let yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

function isProductionDomain(url){
    //let domain = url.substring(url.indexOf('//'), url.indexOf('/'))
    let hostname ='';
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    return hostname === 'api.routesme.com' ? true : false
}