

export function convertHexToRGBint(hex){
    return parseInt(hex.replace('#',''),16);
}

export function convertRGBintToHex(RGBint){
    return '#'+pRGBint?.toString(16);
}

export function returnCampaignIds(campaigns)
{
    let campaignIDList =[];
    campaigns.map(x => (campaignIDList.push(x.campaignId)));
    return campaignIDList;
}