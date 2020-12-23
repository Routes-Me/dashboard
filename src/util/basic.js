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

export function returnEntityForInstitution(entity,institutionId)
{
    if(institutionId !== undefined)
    {
        return institutionId !== '' && isSuperUser(institutionId) ?  entity : `institutions/${institutionId}/${entity}`;  
    }
    return entity;

}

export function isSuperUser(institutionID){
    let currentDomain = config.Domain;
    let superInstitution = isProductionDomain(currentDomain)? config.SuperInstitution : config.StageSuperInstitution 
    return institutionID === superInstitution ? true : false // 1580030173 78132467
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