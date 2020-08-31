import axios from 'axios';
import { userConstants } from '../../constants/userConstants';
import { advertisementConstants, advertisementsConstants } from '../../constants/advertisementConstants';

export function getAdvertisements() {
    return dispatch => {
        dispatch(request())
        axios.get(userConstants.Domain + 'advertisements')
            .then(
                response => { dispatch(success(response)) },
                error => { dispatch(failure(error)) }
            )
    }
    request = () => { type: advertisementsConstants.getAdvertisements_REQUEST }
    success = () => { type: advertisementsConstants.getAdvertisements_SUCCESS }
    failure = (error) => { type: advertisementsConstants.getAdvertisements_ERROR, pa }
}


export function addAdvertisement(advertisement) {
    return dispatch => {
        dispatch(addAdvertisementRequest())
        axios.post(userConstants.Domain + 'advertisement', advertisement)
            .then(
                response => { dispatch(savedAdvertisement(response)) },
                error => { dispatch(saveAdvertisementFailure(error)) }
            )
    }
    addAdvertisementRequest = () => { type: advertisement.addAdvertisementRequest }
    savedAdvertisement = (response) => { type: advertisement.saveAdvertisement }
    saveAdvertisementFailure = (error) => { type: advertisement.saveAdvertisementFailure }
}