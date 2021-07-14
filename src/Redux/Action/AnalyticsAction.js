import { analyticsConstant } from "../../constants/analyticsConstants";
import apiHandler from '../../util/request';

export function getAnalyticsLinkLogs(role, user) {

    return dispatch => {
        dispatch(getAnalyticsRequest());
        apiHandler.get('analytics/linklogs?startAt=1577866406&endAt=1624952956&offset=1&limit=10')
            .then(
                response => {
                    dispatch(getAnalyticsSuccess(returnFormattedData(response)));
                },
                error => {
                    alert("Offline vehicle " + error.toString());
                });
    }
}

function filterObjectValueForKey(array, key) {
    let value = 0;
    const obj = array.filter(item => item.os === key);
    value = obj.length > 0 ? obj[0].value : 0;
    return value;

}

function returnFormattedData(response) {

    const ads = response.data.data;
    const refinedAdds = ads.map(ad => {

        const refineAdds = {
            name: ad.advertisementId,
            iOS: filterObjectValueForKey(ad.osAndValues, 'ios'),
            Android: filterObjectValueForKey(ad.osAndValues, 'android'),
            web: filterObjectValueForKey(ad.osAndValues, 'web'),
            Windows: filterObjectValueForKey(ad.osAndValues, 'windows'),
            Mac: filterObjectValueForKey(ad.osAndValues, 'mac')
        }
        return refineAdds;
    });

    return {
        data: refinedAdds,
        page: response.data.pagination
    }

}

function getAnalyticsSuccess(result) { return { type: analyticsConstant.getAdvertisement_SUCCESS, payload: result } };
export const getAnalyticsRequest = () => ({ type: analyticsConstant.getAdvertisement_REQUEST });
export const getAnalyticsError = error => ({ type: analyticsConstant.getAdvertisement_ERROR, payload: error });