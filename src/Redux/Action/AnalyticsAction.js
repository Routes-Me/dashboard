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
    return new Promise((resolve, reject) => {
        let value = 0;
        const obj = array.filter(item => item.os === key);
        value = obj.length > 0 ? obj[0].value : 0;
        console.log(`OS : ${key} =>`, value);
        resolve(value);
    });

}

function returnFormattedData(response) {

    const adds = response.data.data;
    const refinedAdds = adds.map(add => {

        const refineAdds = {
            name: add.advertisementId
        }
        filterObjectValueForKey(add.osAndValues, 'ios').then((value) => refineAdds.iOS = value);
        filterObjectValueForKey(add.osAndValues, 'android').then((value) => refineAdds.Android = value);
        filterObjectValueForKey(add.osAndValues, 'web').then((value) => refineAdds.web = value);
        filterObjectValueForKey(add.osAndValues, 'windows').then((value) => refineAdds.Windows = value);
        filterObjectValueForKey(add.osAndValues, 'mac').then((value) => refineAdds.Mac = value);
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