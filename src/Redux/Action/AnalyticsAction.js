import { analyticsConstant } from "../../constants/analyticsConstants";
import { config } from "../../constants/config";
import { convertDateTimeToUnix } from "../../util/basic";
import apiHandler from '../../util/request';

export function getAnalyticsLinkLogs(entity, start, end) {

    return dispatch => {
        dispatch(getAnalyticsRequest());
        start = convertDateTimeToUnix(start);//1577866406
        end = convertDateTimeToUnix(end);//1624952956
        apiHandler.get(`analytics/${entity}?startAt=${start}&endAt=${end}&offset=1&limit=10`)
            .then(
                response => {
                    if (entity === config.analytics.qrScans)
                        dispatch(getAnalyticsSuccess(returnFormattedDataForQRScan(response)));
                    if (entity === config.analytics.playBack)
                        dispatch(getAnalyticsSuccess(returnFormattedDataForPlayBacks(response)));
                },
                error => {
                    alert("Offline vehicle " + error.toString());
                });
    }
}


function filterObjectValueForKey(array, key, entity) {
    let value = 0;
    let obj = []
    if (entity === config.analytics.qrScans)
        obj = array.filter(item => item.os === key);
    if (entity === config.analytics.playBack)
        obj = array.filter(item => item.period === key);

    value = obj.length > 0 ? obj[0].value : 0;
    return value;

}

function returnFormattedDataForQRScan(response) {

    const ads = response.data.data;
    const refinedAdds = ads.map(ad => {

        const refinedAd = {
            name: ad.advertisementName,
            iOS: filterObjectValueForKey(ad.osAndValues, 'ios', config.analytics.qrScans),
            Android: filterObjectValueForKey(ad.osAndValues, 'android', config.analytics.qrScans),
            web: filterObjectValueForKey(ad.osAndValues, 'web', config.analytics.qrScans),
            Windows: filterObjectValueForKey(ad.osAndValues, 'windows', config.analytics.qrScans),
            Mac: filterObjectValueForKey(ad.osAndValues, 'mac', config.analytics.qrScans)
        }
        return refinedAd;
    });

    return {
        data: refinedAdds,
        page: response.data.pagination,
        options: config.analytics.category[0].options
    }

}

function returnFormattedDataForPlayBacks(response) {
    const playBacks = response.data.data;
    const refinedPlayBacks = playBacks.map(playBack => {
        const refinedPlayBack = {
            name: playBack.advertisementName,
            Morning: filterObjectValueForKey(playBack.slots, 'morning', config.analytics.playBack),
            Noon: filterObjectValueForKey(playBack.slots, 'noon', config.analytics.playBack),
            Evening: filterObjectValueForKey(playBack.slots, 'evening', config.analytics.playBack),
            Night: filterObjectValueForKey(playBack.slots, 'night', config.analytics.playBack)
        }
        return refinedPlayBack;
    });

    return {
        data: refinedPlayBacks,
        page: response.data.pagination,
        options: config.analytics.category[1].options
    }
}

function getAnalyticsSuccess(result) { return { type: analyticsConstant.getAdvertisement_SUCCESS, payload: result } };
export const getAnalyticsRequest = () => ({ type: analyticsConstant.getAdvertisement_REQUEST });
export const getAnalyticsError = error => ({ type: analyticsConstant.getAdvertisement_ERROR, payload: error });


export function getPlayBackLog() {

}