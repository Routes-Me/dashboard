

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